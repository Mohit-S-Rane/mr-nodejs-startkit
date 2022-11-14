"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const PostValidators_1 = require("../validators/PostValidators");
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/me', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostController_1.PostController.getPostByUser);
        this.router.get('/all', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostController_1.PostController.getAllPosts);
        this.router.get('/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.getPostById(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.getPostById);
    }
    postRouter() {
        this.router.post('/add', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.addPost(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.addPost);
    }
    patchRouter() {
        this.router.patch('/edit/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.editPost(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.editPost);
    }
    deleteRouter() {
        this.router.delete('/delete/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.deletePost(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.deletePost);
    }
}
exports.default = new PostRouter().router;
