import { Request, Response } from "express";
import { Pub, PubInstance } from "../models/Pub";
import { getWhatsapp } from "../helpers/getwhatsapp";
import { getStateSail } from "../helpers/getStateSail";
import { setPaginationADM } from "../helpers/setPagination";
import { serviceApprovedEmail } from "./EmailControllers";
import { User } from "../models/User";
import axios from "axios";

export const waitListToAprove = async (req: Request, res: Response) => {
    const { userName } = req.cookies;
    const adm = req.cookies.ADM
    //pagination config
    let pag = parseInt(req.params.pag);
    let limit = 12;
    let offset = 0;

    if (!isNaN(pag) && pag > 0) {
        offset = limit;
        offset *= (pag - 1);
    }

    //getting all services
    let request = await Pub.findAndCountAll({ where: { status: 0 }, limit, offset });

    let services: PubInstance[] = request.rows;
    //formating the phone number so that we can add to the whatsapp link
    services.forEach(service => getWhatsapp(service));
    services.forEach(service => getStateSail(service));

    const totalServices = request.count;

    let pagination = setPaginationADM(totalServices, limit, offset);

    res.render('pages/ADM', {
        title: 'ADM',
        services,
        css: 'home',
        pagination,
        userName,
        adm
    })
}

export const aproveService = async (req: Request, res: Response) => {
    let id = req.params.id;

    let service = await Pub.findByPk(id);

    if (!service) {
        res.status(404);
        res.redirect('/adm');
        return
    }

    service.status = 1;

    await service.save();

    let serviceOnwer = await User.findOne({ where: { id: service.userId } });

    if (serviceOnwer) {
        serviceApprovedEmail(serviceOnwer);
    }


    res.redirect('/adm')
}

export const rejectService = async (req: Request, res: Response) => {
    let id = req.params.id;

    let service = await Pub.findByPk(id);

    if (!service) {
        res.status(404);
        res.redirect('/adm');
        return
    }

    axios.delete(`${process.env.IMGURDELETE}/${service.pubPhotoDelete}`, {
        headers: {
            Authorization: process.env.IMGUR
        }
    });

    await service.destroy();

    res.redirect('/adm')
}