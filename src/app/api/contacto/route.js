import { NextResponse } from "next/server";
import { enviarCorreoContacto } from "@/componentesServidor/contacto/contacto"

export async function POST(request) {
    const data = await request.json();
    console.log(data);
    await enviarCorreoContacto(data);

    return NextResponse.json({ message: "Your request has been sent successfully" });
}