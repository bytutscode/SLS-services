import axios from "axios";
import { Request, Response } from "express";
import { getStateSail } from "../helpers/getStateSail";
import { Pub } from "../models/Pub";
import { User } from "../models/User";


export const getMyServices = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const { userName } = req.cookies;

    const user = await User.findOne({ where: { token } });
    let services = await Pub.findAll({ where: { userId: user?.id } });
    services.forEach(service => getStateSail(service));

    res.render('pages/myservices', {
        title: 'Meus serviços',
        css: 'myservices',
        services,
        userName
    })
}

export const deleteMyService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { token } = req.cookies;

    let service = await Pub.findByPk(id);

    if (!service) {
        res.status(404);
        res.redirect('../../meus-servicos');
        return
    }
    const user = await User.findOne({ where: { token } });

    if (!user) {
        res.status(401);
        res.redirect('../../meus-servicos');
        return
    }

    if (user.id !== service.userId) {
        res.status(403);
        res.redirect('../../meus-servicos');
        return
    }

    try {
        let deletePhoto = await axios.delete(`${process.env.IMGURDELETE}${service.pubPhotoDelete}`, {
            headers: {
                'Authorization': process.env.IMGUR as string
            }
        });
    } catch (error) {
        if (error) {
            res.status(400);
            res.redirect('../../meus-servicos');
            console.log(error)
            return
        }

    }

    await service.destroy();

    res.status(200);
    res.redirect('../../meus-servicos');
}