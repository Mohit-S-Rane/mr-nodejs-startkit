import { validationResult } from "express-validator";
import User from "../models/User";
import { Utils } from "./../utils/Utils";
import { NodeMailer } from "./../utils/NodeMailer";

export class UserController {
  static async signup(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const verificationToken = Utils.generateVerificationToken();
    NodeMailer.sendEmail({
            to: ["mohitsrane16@gmail.com"],
            subject: "Email Verification",
            html: `<h1>${verificationToken}</h1>`,
          }).then(()=>{
            res.send('success')
          }).catch((e)=>{
            next(e);
          });

    // const data = {
    //   email: email,
    //   password: password,
    //   username: username,
    //   verification_token: verificationToken,
    //   verification_time: Date.now() + new Utils().MAX_TOKEN_TIME,
    // };
    // try {
    //   let user = await new User(data).save();
    //   // Send verification email
    //   res.send(user);
    //   const mailer = await NodeMailer.sendEmail({
    //     to: ["abc@gmail.com"],
    //     subject: "Email Verification",
    //     html: `<h1>${verificationToken}</h1>`,
    //   });
    // } catch (e) {
    //   next(e);
    // }
  }

  static async verify(req, res, next) {
    const verificationToken = req.body.verification_token;
    const email = req.body.email;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verificationToken,
          verification_token_time: { $gt: Date.now() },
        },
        { verified: true, updated_at: new Date() },
        { new: true }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error(
          "Verification Token is Expired. Please Request for New One."
        );
      }
    } catch (e) {
      next(e);
    }
  }
}
