import Express from 'express';
import Auth from '../middleware/Auth';
import AuthControllers from '../controllers/AuthControllers';
import AuthValidator from '../validators/AuthValidator';
import PubValidator from '../validators/PubValidator';
import upload from '../middleware/multer';
import { sendChangePasswordLink } from '../controllers/EmailControllers';
import * as recuperation from "../controllers/RecuperationControllers";
import * as controllersIndex from '../controllers/UserControllers';
import * as PubControllers from '../controllers/PubControllers';
import * as ADMControllers from '../controllers/ADMControllers';

const router = Express.Router();

//routes


//test route
router.get('/ping', controllersIndex.ping);

// main routes 
router.get('/', controllersIndex.home);
router.get('/pag/:pag?', controllersIndex.search);
router.get('/entrar', Auth.notlogged, controllersIndex.loginPage);
router.get('/cadastro', Auth.notlogged, controllersIndex.signUpPage);
router.get('/meus-servicos', Auth.private, PubControllers.getMyServices);
router.get('/meus-servicos/delete/:id', Auth.private, PubControllers.deleteMyService);
router.get('/recuperacao/:token?', Auth.notlogged, controllersIndex.forgetPass);
router.get('/anuncio', Auth.private, controllersIndex.addPage);
router.get('/logout', AuthControllers.logout);


//post routes
router.post('/anuncio', Auth.private, upload.single('image'), PubValidator.pubValidation, PubControllers.addService);
router.post('/cadastrar', AuthValidator.signup, AuthControllers.signup);
router.post('/entrar', AuthValidator.login, AuthControllers.login);
router.post('/recuperacao/:token', Auth.notlogged, recuperation.changeUserPassword);
router.post('/recuperacao', Auth.notlogged, sendChangePasswordLink);


//ADM routes
router.get('/adm', Auth.privateADM, ADMControllers.waitListToAprove)
router.get('/adm/:pag', Auth.privateADM, ADMControllers.waitListToAprove)
router.post('/adm/aprove/:id', Auth.privateADM, ADMControllers.aproveService)
router.post('/adm/reject/:id', Auth.privateADM, ADMControllers.rejectService)

//404 PAGE
router.use(controllersIndex.errorPage)

export default router;