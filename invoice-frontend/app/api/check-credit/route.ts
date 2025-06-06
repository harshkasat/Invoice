import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export async function GET(req: Request) {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
        return redirectToSignIn();
    }

    try {
        const cookieStore = await cookies()
        // Get user_id from cookie
        const user_id = cookieStore.get('user_id');
        
        if (!user_id) {
            return NextResponse.json({ error: "User ID not found in cookie" }, { status: 401 });
        }

        const creditLeft = await checkCredit(user_id.value)
        return NextResponse.json(creditLeft)
    } catch (error) {
        console.error('Failed to fetch list of pdf')
        return NextResponse.json({
            error: "Failed to fetch list of pdf"
        }, { status: 500 })
    }
}

async function checkCredit(userId: string) {
    const response = await fetch(`${BASE_URL}/api/v1/db_operation/check_credit?user_id=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}