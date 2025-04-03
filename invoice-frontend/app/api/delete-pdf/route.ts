import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function DELETE(req: Request) {
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

        const listPdf = await getListPdf(user_id.value, pdfName)
        console.log(listPdf)
        return NextResponse.json(listPdf)
    } catch (error) {
        console.error('Failed to fetch list of pdf')
        return NextResponse.json({
            error: "Failed to fetch list of pdf"
        }, { status: 500 })
    }
}

async function getListPdf(userId: string, pdfName:string) {
    const response = await fetch(`http://127.0.0.1:8000//api/v1/db_operation/delete_user/?user_id=${userId}&pdf_name=${pdfName}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}

