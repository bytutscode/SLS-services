import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { User } from '../models/User';

let html = `<div style="background-color: black;color:white;text-align:center ;">
<img draggable="false" src="https://imgur.com/zE7lnFJ" alt="">
<h1>Recuperação de conta</h1>
<p>Olá [Nome do Usuário],
    <br>
    Recebemos uma solicitação para redefinir a senha associada à sua conta em SLS SERVICES. Para
    continuar com a redefinição de senha, clique no link abaixo:
    <br>
    <a href="[Link de Redefinição de Senha]">Redefinir Senha</a>
    <br>
    Se você não solicitou esta redefinição de senha, pode ignorar este e-mail com segurança.
    <br>
    O link de redefinição de senha é válido por 1 hora. Após esse período, será necessário solicitar uma
    nova redefinição de senha.<br>

    Se você precisar de assistência ou tiver alguma dúvida, não hesite em entrar em contato com nossa equipe de
    suporte em <br>

    Atenciosamente,
    A Equipe da SLS SERVICES
</p>
</div>
`;


export const sendChangePasswordLink = async (req: Request, res: Response) => {

    let userEmail = req.body.email;
    let checkUser = await User.findOne({ where: { email: userEmail } });

    if (!checkUser) {
        res.render('pages/waitConfirmation');
        return
    }

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAILSMTP,
            pass: process.env.APPPASSWORD
        }
    })

    let mensage = {
        from: 'SLS SERVICES',
        to: [userEmail],
        replyTo: 'SLSSERVICES@GMAIL.COM',
        subject: 'assunto',
        html,
        mensage: 'foioiiiii',
        text: 'foifoifoi',

    }

    mensage.html = mensage.html.replace('[Nome do Usuário]', checkUser.username)
    mensage.html = mensage.html.replace('[Link de Redefinição de Senha]', `/recuperacao/${checkUser.token}`)

    await transport.sendMail(mensage);
}