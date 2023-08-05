import Express, { Request, Response } from 'express';
import * as controllersIndex from '../controllers/viewControllers';
import Auth from '../middleware/Auth';
import AuthControllers from '../controllers/AuthControllers';
import AuthValidator from '../validators/AuthValidator';
import * as PubControllers from '../controllers/PubControllers';
import * as UserControllers from '../controllers/UserControllers';
import upload from '../middleware/multer';
import { sendChangePasswordLink } from '../controllers/EmailControllers';
import * as recuperation from "../controllers/RecuperationControllers";
import PubValidator from '../validators/PubValidator';



const router = Express.Router();

//routes


//test route
router.get('/ping', controllersIndex.ping);

// main routes 
router.get('/', controllersIndex.home);
router.get('/pag/:pag?', controllersIndex.homeSearch);
router.get('/entrar', Auth.notlogged, controllersIndex.loginPage);
router.get('/cadastro', Auth.notlogged, controllersIndex.signUpPage);
router.get('/recuperacao/:token?', Auth.notlogged, controllersIndex.forgetPass);
router.get('/logout', AuthControllers.logout);
router.get('/anuncio', Auth.private, controllersIndex.addPage);

//post routes
router.post('/anuncio', Auth.private, upload.single('image'), PubValidator.pubValidation, PubControllers.addService);
router.post('/cadastrar', AuthValidator.signup, AuthControllers.signup);
router.post('/entrar', AuthValidator.login, AuthControllers.login);
router.post('/recuperacao/:token', Auth.notlogged, recuperation.changeUserPassword);
router.post('/recuperacao', Auth.notlogged, sendChangePasswordLink);

//user routes 
router.get('/meus-servicos', Auth.private, UserControllers.getMyServices);
router.get('/meus-servicos/delete/:id', Auth.private, UserControllers.deleteMyService);

router.use(controllersIndex.errorPage)

export default router;