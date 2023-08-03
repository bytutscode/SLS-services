import { User, UserInstance } from '../models/User';
import jws, { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response, } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export default {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let { token } = req.cookies;

        if (!token) {
            res.redirect('/')
            return
        }

        let user: UserInstance | null = await User.findOne({ where: { token } });

        if (!user) {
            res.redirect('/')
            return
        }
        next();
    },
    notlogged: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token;

        if (!token) {
            console.log('entrou')
            next()
            return
        }

        const user = await User.findOne({ where: { token } });

        if (!user) {
            next();
            return
        }
        res.status(200);
        res.redirect('/');
    },
    privateADM: async (req: Request, res: Response) => {

    }
}