import nodemailer from "nodemailer"

export const emailRegistro = async (datos)=>{
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tú cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en UpTask</p>
        <p>Tú cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <br>
        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
        
        `
    })
}


export const emailOlvidePassword = async (datos)=>{
  const {email, nombre, token} = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    } 
    });
  
  const info = await transport.sendMail({
      from: '"UpTask - Administrador de proyectos <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Reestablece tú contraseña",
      text: "Reestablece tú contraseña",
      html: `<p>Hola: ${nombre}, reestablece tú contraseña en UpTask</p>
      <p>Para crear un nuevo password sigue el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a>
      <br>
      <p>Si tú no solicitaste este cambio, puedes ignorar este mensaje.</p>
      
      `
  })
}