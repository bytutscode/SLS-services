import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const checkUserAndSendLink = async (req: Request, res: Response) => {
    const token = req.params.token;

    let checkUser = await User.findOne({ where: { token } });

    if (checkUser) {
        res.render('pages/changePass', {
            link: `/recuperacao/${token}`,
            css: 'styles'
        });
        return
    }

    res.render('pages/forgetpass', {
        css: 'styles'
    })
}

export const changeUserPassword = async (req: Request, res: Response) => {
    let token = req.params.token;
    let newPassword = req.body.password;
    if (newPassword.length < 8) {
        res.redirect(`/recuperacao/${token}`);
        return
    }

    let user = await User.findOne({ where: { token } });

    if (!user) {
        res.redirect('/recuperacao');
        return
    }

    let newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;

    let payload = Date.now() + user.email;
    let newUserToken = jwt.sign(payload, process.env.SECRETKEY as string);
    user.token = newUserToken;

    await user.save();

    res.render('pages/login', { css: 'styles' });

}