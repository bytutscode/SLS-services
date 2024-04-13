import { Request, Response } from 'express';
import { Pub } from '../models/Pub';
import { User } from '../models/User';
import { matchedData, validationResult } from 'express-validator';
import { states } from '../helpers/states';
import { getStateSail } from "../helpers/getStateSail";
import axios from 'axios';



export const getMyServices = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const { userName } = req.cookies;
    let adm = req.cookies.ADM;

    const user = await User.findOne({ where: { token } });
    let services = await Pub.findAll({ where: { userid: user?.id } });
    services.forEach(service => getStateSail(service));

    res.render('pages/myservices', {
        title: 'Meus serviços',
        css: 'myservices',
        services,
        userName,
        adm
    })
}

export const addService = async (req: Request, res: Response) => {
    const userName = req.cookies.userName;
    const adm = req.cookies.ADM;

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        res.render('pages/newPub', {
            title: 'Novo Serviço',
            error: "O anuncio precisa ser preenchido corretamente!",
            userName,
            adm
        })
        return
    }

    let { title, city = '', state = '' } = matchedData(req);


    const token = req.cookies.token;

    const user = await User.findOne({ where: { token } });

    if (!user) {
        res.status(403);
        res.redirect('/entrar');
        return
    }


    if (!req.file) {
        res.render('pages/newPub', {
            title: 'Novo Serviço',
            error: 'O anuncio precisa conter uma imagem',
            userName,
            adm
        });
        res.status(400);
        return
    }

    let allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    let size = 10000000;

    //making sure that the received file is a image and has the allowed size
    if (!allowed.includes(req.file.mimetype) || req.file.size > size) {
        res.render('pages/newPub', {
            title: 'Novo Serviço',
            error: 'É apenas permitido imagens e que tenham até 10MB de tamanho!',
            userName,
            adm
        });
        return
    }

    let newPost = Pub.build();
    newPost.userid = user.id;
    newPost.username = user.username;
    // handle title
    const firstLetter = title.slice(0, 1);
    const rest = title.slice(1);
    title = `${firstLetter.toUpperCase()}${rest.toLowerCase()}`;
    newPost.title = title;

    newPost.phone = user.phone;

    //verifying if is a valid state/city
    let stateReceived = state;
    const checkState = states.find((state) => state.nome.toLowerCase() == stateReceived.toLowerCase());

    if (!checkState) {
        res.status(400);
        res.render('pages/newPub', {
            title: 'Novo Serviço',
            error: 'Estado inválido!',
            userName,
            adm
        });
        return
    }
    newPost.state = state;

    let cityReceived = city;
    const checkcity = checkState.cidades.find((city) => city.toLowerCase() == cityReceived.toLowerCase());

    if (!checkcity) {
        res.status(400);
        res.render('pages/newPub', {
            title: 'Novo Serviço',
            error: 'Cidade inválida!',
            userName,
            adm
        });
        return
    }
    newPost.city = city;

    // reading the received file
    const data = req.file.buffer;

    try {
        // sending the request to upload in IMGUR
        const response = await axios.post(process.env.IMGURUPLOAD as string, data, {
            headers: {
                Authorization: process.env.IMGUR,
                'Content-Type': req.file.mimetype,
            },
        });


        //verifying if the image have been uploaded
        if (response.status !== 200) {
            res.render('pages/newPub', {
                title: 'Novo Serviço',
                error: 'Houve algum problema no processo de upload da sua imagem!',
                userName,
                adm
            });
            res.status(400);
            return
        }

        // saving our img reference 

        newPost.pubphoto = response.data.data.link;
        newPost.pubphotodelete = response.data.data.deletehash;

    } catch (err) {

        res.render('pages/newPub', {
            title: 'Novo Serviço',
            error: 'Houve algum problema no processo de upload da sua imagem!',
            userName,
            css: 'styles',
            adm

        });
        res.status(400);
        return
    }
    newPost = await newPost.save();

    res.render('pages/waitConfirmation', {
        title: 'Aguardando Aprovação',
        userName,
        css: 'wait',
        adm
    })
}


export const deleteMyService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { token } = req.cookies;

    let service = await Pub.findByPk(id);

    if (!service) {
        res.status(404);
        res.redirect('/meus-servicos');
        return
    }
    const user = await User.findOne({ where: { token } });

    if (!user) {
        res.status(401);
        res.redirect('/meus-servicos');
        return
    }

    if (user.id !== service.userid) {
        res.status(403);
        res.redirect('/meus-servicos');
        return
    }

    try {
        let deletePhoto = await axios.delete(`${process.env.IMGURDELETE}${service.pubphotodelete}`, {
            headers: {
                'Authorization': process.env.IMGUR as string
            }
        });
    } catch (error) {
        if (error) {
            res.status(400);
            res.redirect('/meus-servicos');
            console.log(error)
            return
        }

    }

    await service.destroy();

    res.status(200);
    res.redirect('/meus-servicos');
}
