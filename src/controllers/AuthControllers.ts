import Jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { User } from "../models/User";
import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export default {
    signup: async (req: Request, res: Response) => {

        //receiving our form information from express-validator
        let validation = validationResult(req);

        //verifying if there's some error, if so, stop the process of sign up
        if (!validation.isEmpty()) {

            res.render('pages/signup', {
                title: 'Cadastro',
                error: 'Você precisa preencher corretamente cada campo abaixo!',
                css: 'styles'
            });
            return

        }

        //getting the form data
        let { email, name, password, phone } = matchedData(req);

        //verifying if there's already an user with the same email received 
        let verifyEmail = await User.findOne({ where: { email } });

        if (verifyEmail) {
            res.render('pages/signup', {
                title: 'Cadastro',
                error: 'Já existe um usuário com esse email cadastrado!',
                css: 'styles'
            });
            return
        }


        // now, we create our new user and fill it with the received data
        let newUser = User.build();

        newUser.username = name;
        newUser.email = email;
        newUser.phone = phone;

        //treating user password so that we never save it raw in our database
        let hashPassword = await bcrypt.hash(password.toString(), 10);

        newUser.password = hashPassword;

        //creating user token
        let payload = (Date.now() + email + name).toString();
        let token = Jwt.sign(payload, process.env.SECRETKEY as string);

        newUser.token = token;

        //save new user in our database

        newUser = await newUser.save();
        // saving the token in a cookie
        res.cookie('token', newUser.token, { maxAge: 31536000000, httpOnly: true });
        res.cookie('userName', newUser.username, { maxAge: 31536000000, httpOnly: true });

        res.redirect('/');

    },

    login: async (req: Request, res: Response) => {

        //checking if the validation of received items is ok
        let validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.render('pages/login', {
                title: 'login',
                error: 'Senha ou email inválido!',
                css: 'styles'
            });
            return
        }

        // check the email or username and if there's a user, get him
        let { email, password } = matchedData(req);

        let verifyEmail = await User.findOne({ where: { email } });

        if (!verifyEmail) {
            res.render('pages/login', {
                title: 'login',
                error: 'Email /ou senha incorretos!',
                css: 'styles'
            });
            return
        }

        let user = verifyEmail
        if (!user) {
            return
        }
        //comparing our hash with the password sended
        let passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            res.render('pages/login', {
                title: 'login',
                error: 'Email /ou senha incorretos!',
                css: 'styles'
            })
            return
        }

        res.cookie('token', user.token, { maxAge: 31536000000, httpOnly: true })
        res.cookie('userName', user.username, { maxAge: 31536000000, httpOnly: true });

        if (user.position === 'ADM') {
            res.cookie('ADM', true, { maxAge: 31536000000, httpOnly: true })
        } else {
            res.cookie('ADM', null, { expires: new Date(0) });
        }

        res.redirect('/');

    },


    logout: async (req: Request, res: Response) => {
        res.cookie('token', null, { expires: new Date(0) });
        res.cookie('userName', null, { expires: new Date(0) });
        res.redirect('/')
    }

}