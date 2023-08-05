
import Express, { Router } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import router from './routers/index';
import cors from 'cors';
import MustacheExpress from 'mustache-express';
import Path from 'path';
import cookieParser from 'cookie-parser';
import { errorPage } from './controllers/viewControllers';
dotenv.config();



//configuring the server
const server = Express();

//setting our app engine
server.set('view engine', 'mustache')
server.set('views', Path.join(__dirname, 'views'))
server.engine('mustache', MustacheExpress());


//stating that our server can use POST routes so that receive forms
server.use(Express.urlencoded({ extended: true }));
server.use(Express.json());
server.use(cors());
server.use(cookieParser());

//stating a public folder
server.use(Express.static(Path.join(__dirname, '../public')));

//stating our router
server.use(router);


//setting the port and initializing the server
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`server is runnig on ${process.env.BASE}:${port}`)
});
