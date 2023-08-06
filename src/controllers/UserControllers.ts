import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { getStateSail } from '../helpers/getStateSail';
import { getWhatsapp } from '../helpers/getwhatsapp';
import { setPagination } from '../helpers/setPagination';
import { Pub, PubInstance } from '../models/Pub';
import { checkUserAndSendLink } from './RecuperationControllers';



// route to test if our server is on
export const ping = async (req: Request, res: Response) => {

    res.json({ pong: true })
}

//our home page
export const home = async (req: Request, res: Response) => {
    const userName = req.cookies.userName;
    const adm = req.cookies.ADM;


    //pagination config
    let pag = parseInt(req.params.pag);
    let limit = 12;
    let offset = 0;

    if (!isNaN(pag) && pag > 0) {
        offset = limit;
        offset *= (pag - 1);
    }

    //getting all services
    let request = await Pub.findAndCountAll({ where: { status: 1 }, limit, offset });

    let services: PubInstance[] = request.rows;
    //formating the phone number so that we can add to the whatsapp link
    services.forEach(service => getWhatsapp(service));
    services.forEach(service => getStateSail(service));

    const totalServices = request.count;

    let pagination = setPagination(totalServices, limit, offset);

    res.render('pages/home', {
        title: 'Serviços',
        userName,
        services,
        css: 'home',
        pagination,
        adm
    })
}


export const search = async (req: Request, res: Response) => {
    const userName = req.cookies.userName;
    const adm = req.cookies.ADM;


    //pagination config
    let pag = parseInt(req.params.pag);
    let limit = 12;
    let offset = 0;

    if (!isNaN(pag) && pag > 0) {
        offset = limit;
        offset *= (pag - 1);
    }

    //fill filters
    const { state, city, search } = req.query;


    let filters: any = {}
    filters.status = 1;
    if (city) {
        filters.city = city;
    }
    if (state) {
        filters.state = state;
    }
    if (search) {
        filters.title = { [Op.like]: `%${search}%` };

    }


    //getting all services that matches with the filters
    let request = await Pub.findAndCountAll({ where: filters, limit, offset });
    let services: PubInstance[] = request.rows;



    services.forEach(service => getWhatsapp(service));
    services.forEach(service => getStateSail(service));

    const totalServices = request.count;
    let pagination = setPagination(totalServices, limit, offset, req.query);

    res.render('pages/home', {
        title: 'Serviços',
        userName,
        services,
        css: 'home',
        search, state, city,
        pagination,
        adm
    })

}


export const loginPage = async (req: Request, res: Response) => {

    res.render('pages/login', {
        title: 'Entrar',
        css: 'styles'
    })
}

export const signUpPage = async (req: Request, res: Response) => {
    res.render('pages/signup', {
        title: 'Cadastrar',
        css: 'styles'
    })
}

export const forgetPass = async (req: Request, res: Response) => {
    let { token } = req.params;

    if (token) {
        checkUserAndSendLink(req, res);
        return
    }


    res.render('pages/forgetpass', {
        title: 'Recuperação',
        css: 'styles'
    })
}

export const addPage = async (req: Request, res: Response) => {
    const adm = req.cookies.ADM;
    const userName = req.cookies.userName;

    res.render('pages/newPub', {
        title: 'Anunciar',
        css: 'styles',
        userName,
        adm
    })
}

export const errorPage = async (req: Request, res: Response) => {
    const userName = req.cookies.userName;
    const adm = req.cookies.ADM;
    res.render('pages/404', {
        title: '404',
        userName,
        adm
    });
    res.status(404);
}