import { validationResult } from "express-validator";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { Utils } from "./../utils/Utils";
import { NodeMailer } from "./../utils/NodeMailer";
import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariable } from "../environment/env";

export class CommentController {
  static async addComment(req, res, next) {
    const content = req.body.content;
    const post = req.post;
    try {
      const comment = new Comment({
        content: content,
        created_at: new Date(),
        updated_at: new Date(),
      });
      post.comments.push(comment);
      await Promise.all([comment.save(), post.save()]);
      res.send(comment);
    } catch (e) {
      next(e);
    }
  }
}
