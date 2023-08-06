import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { htmlApproved, htmlRecuperation } from '../helpers/emailTemplate';
import { User, UserInstance } from '../models/User';



const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAILSMTP,
        pass: process.env.APPPASSWORD
    }
})

export const sendChangePasswordLink = async (req: Request, res: Response) => {

    let userEmail = req.body.email;
    if (!userEmail) {
        res.status(200);
        res.render('pages/recuperationSent', {
            title: 'recuperação',
            css: 'styles'
        })
        return
    }
    let checkUser = await User.findOne({ where: { email: userEmail } });

    if (!checkUser) {
        res.status(200);
        res.render('pages/recuperationSent', {
            title: 'recuperação',
            css: 'styles'
        });
        return
    }


    let mensage = {
        from: 'SLS SERVICES',
        to: [userEmail],
        replyTo: 'SLSSERVICES@GMAIL.COM',
        subject: 'Recuperação de conta',
        html: htmlRecuperation,
        mensage: '',
        text: '',

    }

    mensage.html = mensage.html.replace('[Nome do Usuário]', checkUser.username)
    mensage.html = mensage.html.replace('[Link de Redefinição de Senha]', `http://sls-services.vercel.app/recuperacao/${checkUser.token}`)

    await transport.sendMail(mensage);
    res.status(200);
    res.render('pages/recuperationSent', {
        title: 'recuperação',
        css: 'styles'
    })
}


export const serviceApprovedEmail = async (user: UserInstance) => {
    let mensage = {
        from: 'SLS SERVICES',
        to: [user.email],
        replyTo: 'SLSSERVICES@GMAIL.COM',
        subject: 'Recuperação de conta',
        html: htmlApproved,
        mensage: '',
        text: '',

    }

    mensage.html = mensage.html.replace('[Nome do Usuário]', user.username);

    transport.sendMail(mensage);
}