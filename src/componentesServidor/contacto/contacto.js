import { Resend } from "resend";

const PROPIETARIO = "sraether@proton.me";


export async function enviarCorreoContacto(datos) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { correo, nombre, problematica, comentario } = datos;
    const asunto = "Nuevo contacto desde REDMEXSU";
    // Enviar correo a propietario
    const data = await resend.emails.send({
      from: "REDMEXSU <noresponda@redmexsu.org>",
      to: [PROPIETARIO],
      subject: asunto,
      html: `
          <h1>Nuevo mensaje desde el formulario de contacto de REDMEXSU</h1>
          <h2>Detalles del contacto</h2>
          <p>
              <strong>Nombre:</strong> ${nombre}
          </p>
          <p>
              <strong>Correo electrónico:</strong> ${correo}
          </p>
          <p>
              <strong>Problemática:</strong> ${problematica}
          </p>
          <p>
              <strong>Comentario:</strong> ${comentario}
          </p>
          <hr>
          <p><em>Este mensaje fue enviado desde el sitio web de la Red Mexicana de Supercómputo.</em></p>
        `,
    });
    //console.log(data);
    

    // Enviar correo de confirmación al usuario
    const data2 = await resend.emails.send({
      from: "REDMEXSU <noresponda@redmexsu.org>",
      to: [correo],
      subject: "¡Gracias por contactar a REDMEXSU!",
      html: `
            <h1>Estimado/a ${nombre},</h1>
            <p>
            Gracias por ponerte en contacto con la Red Mexicana de Supercómputo (REDMEXSU). 
            Hemos recibido tu mensaje y apreciamos tu interés en nuestros servicios.
            </p>
            <p>
            Revisaremos tu consulta y te responderemos lo antes posible.
            </p>
            <p>
            Mientras tanto, te invitamos a visitar nuestro sitio web 
            <a href="https://redmexsu.org">redmexsu.org</a> para conocer más sobre 
            nuestros servicios de supercómputo y recursos disponibles.
            </p>
            <p>
            ¡Esperamos poder asistirte pronto!
            </p>
            <p>
            Saludos cordiales,<br>
            <strong>Equipo REDMEXSU</strong><br>
            Red Mexicana de Supercómputo
            </p>
          `,
    });
    //console.log(data2);
    
    return { success: true, message: "Correos enviados exitosamente" };
  } catch (error) {
    console.error("Error al enviar correo:", error.message);
    throw new Error("Error al enviar correo de contacto");
  }
}

