import { NextResponse } from "next/server";
import { enviarCorreoContacto } from "@/componentesServidor/contacto/contacto"

// Manejar preflight OPTIONS para CORS
export async function OPTIONS(request) {
    return new NextResponse(null, { status: 200 });
}

export async function POST(request) {
    const data = await request.json();
    console.log(data);
    await enviarCorreoContacto(data);

    return NextResponse.json({ message: "Your request has been sent successfully" });
}