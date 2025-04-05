import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(req: Request) {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
        return redirectToSignIn();
    }

    try {
        const cookieStore = await cookies()
        const user_id = cookieStore.get('user_id');
        
        if (!user_id) {
            return NextResponse.json({ error: "User ID not found in cookie" }, { status: 401 });
        }

        // Get the form data directly from the request
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Create new FormData for the FastAPI request
        const apiFormData = new FormData();
        apiFormData.append('file', file);
        apiFormData.append('user_id', user_id.value);

        const response = await fetch(`${BASE_URL}/api/v1/upload/upload_invoice?user_id=${user_id.value}`, {
            method: "POST",
            body: apiFormData
        });

        if (!response.ok) {
            throw new Error('Failed to upload to FastAPI');
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Failed to process PDF:', error);
        return NextResponse.json({
            error: "Failed to process PDF"
        }, { status: 500 });
    }
}