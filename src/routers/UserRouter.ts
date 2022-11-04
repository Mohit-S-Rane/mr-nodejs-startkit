import { Router } from 'express';
import { UserValidators } from './../validators/UserValidators';
import { UserController } from './../controllers/UserController';

class UserRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter(){}

    postRouter(){
        this.router.post('/signup', UserValidators.signup(), UserController.signup)
    }

    patchRouter(){}

    deleteRouter(){}
}

export default new UserRouter().router;