import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS
const host = process.env.EMAIL_HOST
const port = process.env.EMAIL_PORT


const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const { email, name, token} = datos;
      //enviar el email

      const info = await transport.sendMail({
        from: 'APV - Administrador de pacientes de veterinario',
        to: email, 
        subject:'Recupera tu contrasena',
        text: 'Comprueba tu cuenta en APV',
        html: `<p> Hola ${name}. Haz click en el siguiente enlace para generar una nueva contrasena </p>
        <p> Debes confirmar tu cuenta en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}recovery/${token}"> Recupera tu cuenta.</a></p>
        
        <p> Si no creaste esta cuenta, ignora el mensaje.</p>
        `
     });

     console.log("mensaje enviado: %s", info.messageId)

}

export default emailOlvidePassword