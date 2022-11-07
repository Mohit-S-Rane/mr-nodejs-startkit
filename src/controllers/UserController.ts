import { validationResult } from "express-validator";
import User from "../models/User";
import { Utils } from "./../utils/Utils";
import { NodeMailer } from "./../utils/NodeMailer";
import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";

export class UserController {
  static async signup(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    const verificationToken = Utils.generateVerificationToken();

    try {
      const hash = await UserController.encryptPassword(req, res, next);
      const data = {
        email: email,
        password: hash,
        username: username,
        verification_token: verificationToken,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        created_at: new Date(),
        updated_at: new Date(),
      };
      let user = await new User(data).save();
      // Send verification email
      res.send(user);
      await NodeMailer.sendEmail({
        to: ["mohitsrane16@gmail.com"],
        subject: "Email Verification",
        html: `<h1>${verificationToken}</h1>`,
      });
    } catch (e) {
      next(e);
    }
  }

  private static async encryptPassword(req, res, next) {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
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

  static async resendVerificationEmail(req, res, next) {
    const email = req.query.email;
    const verificationToken = Utils.generateVerificationToken();
    try {
      const user: any = await User.findOneAndUpdate(
        { email: email },
        {
          verification_token: verificationToken,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );
      if (user) {
        const mailer = await NodeMailer.sendEmail({
          to: [user.email],
          subject: "Email Verification",
          html: `<h1>${verificationToken}</h1>`,
        });
        res.json({
          success: true,
        });
      } else {
        throw Error("User does not Exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async test(req, res, next) {
    const email = req.query.email;
    const password = req.query.password;
    User.findOne({ email: email }).then((user: any) => {
      Bcrypt.compare(password, user.password, (err, same) => {
        res.send(same);
      });
    });
  }

  static async login(req, res, next) {
    const password = req.query.password;
    Bcrypt.compare(password, req.user.password, (err, isValid) => {
      if (err) {
        next(new Error(err.message));
      } else if (!isValid) {
        next(new Error("Email & Password does not match"));
      } else {
        const data = {
          user_id: req.user._id,
          email: req.user.email,
        };
        const token = Jwt.sign(data, "secret", { expiresIn: "120d" });
        res.json({
          token: token,
          user: req.user
        })
      }
    });
  }
}
