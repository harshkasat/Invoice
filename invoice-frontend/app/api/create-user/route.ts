import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
export async function POST(req: Request) {
    const { userId, redirectToSignIn} = await auth();

    if (!userId) {
        return redirectToSignIn();
    }

    try {
        const userData = await fetchUserData(userId);
        console.log(userData)
        return NextResponse.json(userData);
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
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
        username: user.username,
        user_id: userId,
    };
}
