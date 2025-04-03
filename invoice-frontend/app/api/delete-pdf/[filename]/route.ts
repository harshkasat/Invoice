import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function DELETE(req: Request) {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
        return redirectToSignIn();
    }

    try {
        // Extract PDF name from URL
        const pdfName = req.url.split('/').pop();
        if (!pdfName) {
            return NextResponse.json({ error: "PDF name is required" }, { status: 400 });
        }

        const cookieStore = await cookies()
        const user_id = cookieStore.get('user_id');
        
        if (!user_id) {
            return NextResponse.json({ error: "User ID not found in cookie" }, { status: 401 });
        }

        const result = await deletePdf(user_id.value, pdfName)
        console.log(result)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to delete PDF:', error)
        return NextResponse.json({
            error: "Failed to delete PDF"
        }, { status: 500 })
    }
}

async function deletePdf(userId: string, pdfName: string) {
    console.log("delet PDF fastapi"+ pdfName)
    const response = await fetch(`http://127.0.0.1:8000/api/v1/db_operation/delete_pdf/?user_id=${userId}&pdf_name=${pdfName}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}

