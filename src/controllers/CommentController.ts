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

  static async editComment(req, res, next) {
    const content = req.body.content;
    const commentId = req.params.id;
    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        { content: content, updtaed_at: new Date()}, 
        {new: true}
      );
      if (updatedComment) {
        res.send(updatedComment);
      } else {
        throw new Error("Comment does not exist...");
      }
    } catch (e) {
      next(e);
    }
  }
}
