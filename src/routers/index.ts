import Express from 'express';
import * as controllersIndex from '../controllers/viewControllers';
import Auth from '../middleware/Auth';
import AuthControllers from '../controllers/AuthControllers';
import AuthValidator from '../validators/AuthValidator';
import * as PubControllers from '../controllers/PubControllers';
import * as UserControllers from '../controllers/UserControllers';
import upload from '../middleware/multer';
import { sendChangePasswordLink } from '../controllers/EmailControllers';





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
router.post('/recuperacao', Auth.notlogged, sendChangePasswordLink);
router.get('/logout', AuthControllers.logout);
router.get('/anuncio', Auth.private, controllersIndex.addPage);

//post routes
router.post('/anuncio', Auth.private, upload.single('image'), AuthValidator.pubValidation, PubControllers.addService);
router.post('/cadastrar', AuthValidator.signup, AuthControllers.signup);
router.post('/entrar', AuthValidator.login, AuthControllers.login);

//user routes 
router.get('/meus-servicos', Auth.private, UserControllers.getMyServices);
router.get('/meus-servicos/delete/:id', Auth.private, UserControllers.deleteMyService);

export default router;