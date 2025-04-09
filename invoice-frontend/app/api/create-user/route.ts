import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";


interface UserData {
    email: string;
    username: string;
}

interface CreateUserResponse {
    message:string
    user_id: string;
    username: string;
}

export async function POST(req: Request) {
    const { userId, redirectToSignIn} = await auth();

    if (!userId) {
        return redirectToSignIn();
    }

    try {
        const userData = await fetchUserData(userId);
        console.log(userData)
        const response: CreateUserResponse = await createUser(userData);
        console.log(response.user_id)
        
        // Create response with cookie
        const nextResponse = NextResponse.json(response);
        
        // Set HTTP-only cookie with strict security options
        nextResponse.cookies.set({
            name: 'user_id',
            value: response.user_id,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            // Expires in 7 days
            maxAge: 60 * 60 * 24 * 7
        });

        return nextResponse;
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}

async function createUser(userData: UserData) {
    const response = await fetch(`${BASE_URL}/api/v1/db_operation/create_user`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    
    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return response.json();
}

async function fetchUserData(userId: string) {
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data from Clerk");
    }

    const user = await response.json();
    return {
        email: user.email_addresses[0].email_address,
        username: user.first_name,
    };
}
