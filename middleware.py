from datetime import datetime
import os
from typing import Optional, Tuple
import jwt
import requests
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt.algorithms import RSAAlgorithm
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

class ClerkSDK:
    def __init__(self):
        self.CLERK_API_URL = "https://api.clerk.com/v1"
        self.CLERK_FRONTEND_API_URL = os.getenv("CLERK_FRONTEND_API_URL")
        self.CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
        self.JWKS_URL = "https://concrete-duckling-78.clerk.accounts.dev/.well-known/jwks.json"
        self._jwks_data = None

    async def fetch_user_info(self, user_id: str) -> Tuple[dict, bool]:
        response = requests.get(
            f"{self.CLERK_API_URL}/users/{user_id}",
            headers={"Authorization": f"Bearer {self.CLERK_SECRET_KEY}"},
        )
        print(response)
        if response.status_code == 200:
            data = response.json()
            return {
                "email_address": data["email_addresses"][0]["email_address"],
                "last_sign_in_at": datetime.fromtimestamp(data["last_sign_in_at"] / 1000),
            }, True
        return {
            "email_address": "",
            "first_name": "",
            "last_name": "",
            "last_sign_in_at": None,
        }, False

    def get_jwks(self) -> dict:
        if not self._jwks_data:
            response = requests.get(self.JWKS_URL)
            if response.status_code == 200:
                self._jwks_data = response.json()
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Failed to fetch JWKS",
                )
        return self._jwks_data

class JWTAuthMiddleware:
    def __init__(self):
        self.clerk = ClerkSDK()

    async def __call__(
        self, credentials: HTTPAuthorizationCredentials = Depends(security)
    ) -> Optional[dict]:
        if not credentials:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Bearer token not provided",
            )

        try:
            token = credentials.credentials
            jwks_data = self.clerk.get_jwks()
            public_key = RSAAlgorithm.from_jwk(jwks_data["keys"][0])

            payload = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                options={"verify_signature": True},
            )

            user_id = payload.get("sub")
            print("user id: ", user_id)
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid user ID in token",
                )

            # Fetch user info from Clerk
            user_info, found = await self.clerk.fetch_user_info(user_id)
            print(user_info)
            if found:
                payload.update(user_info)

            return payload

        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
            )
        except jwt.DecodeError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token decode error",
            )
        except jwt.InvalidTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )