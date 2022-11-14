"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = require("../controllers/CommentController");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const CommentValidators_1 = require("../validators/CommentValidators");
class CommentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() { }
    postRouter() {
        this.router.post('/add/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, CommentValidators_1.CommentValidators.addComment(), GlobalMiddleware_1.GlobalMiddleware.checkError, CommentController_1.CommentController.addComment);
    }
    patchRouter() {
        this.router.patch('/edit/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, CommentValidators_1.CommentValidators.editComment(), GlobalMiddleware_1.GlobalMiddleware.checkError, CommentController_1.CommentController.editComment);
    }
    deleteRouter() {
        this.router.delete('/delete/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, CommentValidators_1.CommentValidators.deleteComment(), GlobalMiddleware_1.GlobalMiddleware.checkError, CommentController_1.CommentController.deleteComment);
    }
}
exports.default = new CommentRouter().router;
