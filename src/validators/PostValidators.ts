import { body, query } from "express-validator";
import Post from "../models/Post";

export class PostValidators {
    static addPost() {
        return [body('content', 'Post Content is required').isString()]
    }
}