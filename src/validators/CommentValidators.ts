import { body, param, query } from "express-validator";
import Comment from "../models/Comment";
import Post from "../models/Post";

export class CommentValidators {
  static addComment() {
    return [
      body("content", "Content is required").isString(),
      param("id").custom((id, { req }) => {
        return Post.findOne({ _id: id }).then((post) => {
          if (post) {
            req.post = post;
            return true;
          } else {
            throw new Error("Post does not exist");
          }
        });
      }),
    ];
  }
}
