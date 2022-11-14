"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserValidators_1 = require("./../validators/UserValidators");
const UserController_1 = require("./../controllers/UserController");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const Utils_1 = require("./../utils/Utils");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/send/verification/email', GlobalMiddleware_1.GlobalMiddleware.authenticate, UserController_1.UserController.resendVerificationEmail);
        // this.router.get('/send/verification/email', UserValidators.resendVerificationEmail(), GlobalMiddleware.checkError, UserController.resendVerificationEmail)
        this.router.get('/login', UserValidators_1.UserValidators.login(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.login);
        this.router.get('/reset/password', UserValidators_1.UserValidators.sendResetPasswordEmail(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', UserValidators_1.UserValidators.verifyResetPasswordToken(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyResetPasswordToken);
        // this.router.get('/test', UserController.test)
    }
    postRouter() {
        this.router.post('/signup', UserValidators_1.UserValidators.signup(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.signup);
    }
    patchRouter() {
        this.router.patch('/verify', GlobalMiddleware_1.GlobalMiddleware.authenticate, UserValidators_1.UserValidators.verifyUser(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verify),
            this.router.patch('/update/password', GlobalMiddleware_1.GlobalMiddleware.authenticate, UserValidators_1.UserValidators.updatePassword(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updatePassword);
        this.router.patch('/reset/password', UserValidators_1.UserValidators.resetPassword(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.resetPassword);
        this.router.patch('/update/profilePic', GlobalMiddleware_1.GlobalMiddleware.authenticate, new Utils_1.Utils().multer.single('profile_pic'), UserValidators_1.UserValidators.updateProfilePic(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updateProfilePic);
    }
    deleteRouter() { }
}
exports.default = new UserRouter().router;
