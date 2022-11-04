import { validationResult } from "express-validator";
import User from "../models/User";
import { Utils } from './../utils/Utils';

export class UserController {
    static async signup(req,res,next){
        const error = validationResult(req);
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        const data = {
            email: email,
            password: password,
            username: username,
            verification_token: Utils.generateVerificationToken(),
            verification_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }

        if(!error.isEmpty()) {
            next(new Error(error.array()[0].msg))
            return;
        }

        try{
            let user = await new User(data).save();
            // Send verification email
            res.send(user);
        }catch(e) {
            next(e);
        }

    }
}