"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signup() {
        return [
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                console.log(req.body);
                return User_1.default.findOne({ email: email }).then((user) => {
                    return true;
                    if (user) {
                        throw new Error("User Already Exist");
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)("password", "Password is required")
                .isAlphanumeric()
                .isLength({ min: 8, max: 20 })
                .withMessage("password can be from 8-20 characters"),
            (0, express_validator_1.body)("username", "Username is required").isString(),
        ];
    }
    static verifyUser() {
        return [
            (0, express_validator_1.body)("verification_token", "Correct Verification taken is required").isNumeric(),
        ];
    }
    static resendVerificationEmail() {
        return [(0, express_validator_1.query)("email", "Email is required").isEmail()];
    }
    static login() {
        return [
            (0, express_validator_1.query)("email", "Email is Required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error("User does not Exist");
                    }
                });
            }),
            (0, express_validator_1.query)("password", "Valid Password is required").isAlphanumeric(),
        ];
    }
    static updatePassword() {
        return [
            (0, express_validator_1.body)("password", "Password is required").isAlphanumeric(),
            (0, express_validator_1.body)("confirm_password", "Confirm Password is required").isAlphanumeric(),
            (0, express_validator_1.body)("new_password", "New Password is required")
                .isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error("Password and Confirm Password Does Not Match");
                }
            }),
        ];
    }
    static sendResetPasswordEmail() {
        return [
            (0, express_validator_1.query)("email", "Email is required")
                .isEmail()
                .custom((email) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error("Email does not exist");
                    }
                });
            }),
        ];
    }
    static verifyResetPasswordToken() {
        return [
            (0, express_validator_1.query)("reset_password_token", "Reset password token is required")
                .isNumeric()
                .custom((token, { req }) => {
                return User_1.default.findOne({
                    reset_password_token: token,
                    reset_password_token_time: { $gt: Date.now() },
                }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error("Token does not exist. Please request for a new one");
                    }
                });
            }),
        ];
    }
    static resetPassword() {
        return [
            (0, express_validator_1.body)("email", "Email is required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error("User does not Exist");
                    }
                });
            }),
            (0, express_validator_1.body)("new_password", "New Password is required")
                .isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    throw new Error("confirm password and new password does not match");
                }
            }),
            (0, express_validator_1.body)("confirm_password", "Confirm Password is required").isAlphanumeric(),
            (0, express_validator_1.body)("reset_password_token", "Reset Password Token is required")
                .isNumeric()
                .custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error("Reset password token is invalid. Please try again");
                }
            }),
        ];
    }
    static updateProfilePic() {
        return [(0, express_validator_1.body)('profile_pic').custom((profilePic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File not Uploaded');
                }
            })];
    }
}
exports.UserValidators = UserValidators;
