import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleware';
import { CommentValidators } from '../validators/CommentValidators';
import { Utils } from './../utils/Utils';

class CommentRouter {
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
        this.router.post('/add/:id', GlobalMiddleware.authenticate, CommentValidators.addComment(), GlobalMiddleware.checkError, CommentController.addComment)
    }

    patchRouter(){
        this.router.patch('/edit/:id', GlobalMiddleware.authenticate, CommentValidators.editComment(), GlobalMiddleware.checkError, CommentController.editComment)
    }

    deleteRouter(){}
}

export default new CommentRouter().router;
