import { Request, Response } from 'express';
import { Pub } from '../models/Pub';
import { User } from '../models/User';
import { matchedData, validationResult } from 'express-validator';
import { states } from '../helpers/states';
import axios from 'axios';
import fs from 'fs';

export const addService = async (req: Request, res: Response) => {
    const userName = req.cookies.userName;

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        res.render('pages/newPub', {
            error: "O anuncio precisa ser preenchido corretamente!",
            userName
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
            error: 'O anuncio precisa conter uma imagem',
            userName
        });
        res.status(400);
        return
    }

    let allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    let size = 10000000;

    //making sure that the received file is a image and has the allowed size
    if (!allowed.includes(req.file.mimetype) || req.file.size > size) {
        res.render('pages/newPub', { error: 'É apenas permitido imagens e que tenham até 10MB de tamanho!' });
        return
    }

    let newPost = Pub.build();
    newPost.userId = user.id;
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
            error: 'Estado inválido!',
            userName
        });
        return
    }
    newPost.state = state;

    let cityReceived = city;
    const checkcity = checkState.cidades.find((city) => city.toLowerCase() == cityReceived.toLowerCase());

    if (!checkcity) {
        res.status(400);
        res.render('pages/newPub', {
            error: 'Cidade inválida!',
            userName
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
                error: 'Houve algum problema no processo de upload da sua imagem!',
                userName
            });
            res.status(400);
            return
        }

        // saving our img reference 

        newPost.pubPhoto = response.data.data.link;
        newPost.pubPhotoDelete = response.data.data.deletehash;

    } catch (err) {

        res.render('pages/newPub', {
            error: 'Houve algum problema no processo de upload da sua imagem!',
            userName,
            css: 'styles'

        });
        res.status(400);
        return
    }
    newPost = await newPost.save();

    res.render('pages/waitConfirmation', { userName, css: 'wait' })
}
