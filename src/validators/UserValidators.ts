import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static signup() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          console.log(req.body);
          return User.findOne({ email: email }).then((user) => {
            return true;
            if (user) {
              throw new Error("User Already Exist");
            } else {
              return true;
            }
          });
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("password can be from 8-20 characters"),
      body("username", "Username is required").isString(),
    ];
  }

  static verifyUser() {
    return [
      body(
        "verification_token",
        "Correct Verification taken is required"
      ).isNumeric(),
    ];
  }

  static resendVerificationEmail() {
    return [query("email", "Email is required").isEmail()];
  }

  static login() {
    return [
      query("email", "Email is Required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User does not Exist");
            }
          });
        }),
      query("password", "Valid Password is required").isAlphanumeric(),
    ];
  }
}
