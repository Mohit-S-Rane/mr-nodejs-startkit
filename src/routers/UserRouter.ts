import { Router } from 'express';
import { UserValidators } from './../validators/UserValidators';
import { UserController } from './../controllers/UserController';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleware';


class UserRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter(){
        this.router.get('/send/verification/email', UserValidators.resendVerificationEmail(), GlobalMiddleware.checkError, UserController.resendVerificationEmail)
        this.router.get('/login', UserValidators.login(), GlobalMiddleware.checkError, UserController.login)
        this.router.get('/test', UserController.test)
    }

    postRouter(){
        this.router.post('/signup', UserValidators.signup(), GlobalMiddleware.checkError, UserController.signup);
    }

    patchRouter(){
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddleware.checkError, UserController.verify);
    }

    deleteRouter(){}
}

export default new UserRouter().router;