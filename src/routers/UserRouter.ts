import { Router } from 'express';
import { UserValidators } from './../validators/UserValidators';
import { UserController } from './../controllers/UserController';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleware';
import { Utils } from './../utils/Utils';


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
        this.router.get('/send/verification/email', GlobalMiddleware.authenticate, UserController.resendVerificationEmail)
        // this.router.get('/send/verification/email', UserValidators.resendVerificationEmail(), GlobalMiddleware.checkError, UserController.resendVerificationEmail)
        this.router.get('/login', UserValidators.login(), GlobalMiddleware.checkError, UserController.login)
        this.router.get('/reset/password', UserValidators.sendResetPasswordEmail(), GlobalMiddleware.checkError, UserController.sendResetPasswordEmail)
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleware.checkError, UserController.verifyResetPasswordToken)
        this.router.get('/test', UserController.test)
    }

    postRouter(){
        this.router.post('/signup', UserValidators.signup(), GlobalMiddleware.checkError, UserController.signup);
    }

    patchRouter(){
        this.router.patch('/verify', GlobalMiddleware.authenticate, UserValidators.verifyUser(), GlobalMiddleware.checkError, UserController.verify),
        this.router.patch('/update/password', GlobalMiddleware.authenticate, UserValidators.updatePassword(), GlobalMiddleware.checkError, UserController.updatePassword)
        this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleware.checkError, UserController.resetPassword)
        this.router.patch('/update/profilePic', GlobalMiddleware.authenticate, new Utils().multer.single('profile_pic'), UserValidators.updateProfilePic(), GlobalMiddleware.checkError, UserController.updateProfilePic)
    }

    deleteRouter(){}
}

export default new UserRouter().router;