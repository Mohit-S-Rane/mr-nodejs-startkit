import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleware';
import { PostValidators } from '../validators/PostValidators';
import { Utils } from './../utils/Utils';


class PostRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter(){
        this.router.get('/me', GlobalMiddleware.authenticate, PostController.getPostByUser)
    }

    postRouter(){
        this.router.post('/add', GlobalMiddleware.authenticate, PostValidators.addPost(), GlobalMiddleware.checkError, PostController.addPost)
    }

    patchRouter(){}

    deleteRouter(){}
}

export default new PostRouter().router;