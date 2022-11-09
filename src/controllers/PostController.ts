import { validationResult } from "express-validator";
import Post from "../models/Post";
import { Utils } from "./../utils/Utils";
import { NodeMailer } from "./../utils/NodeMailer";
import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariable } from "../environment/env";

export class PostController {
    static addPost(req,res,next){
        const userId = req.user.user_id;
        const content = req.body.content;
        const post = new Post({
            user_id: userId,
            content: content,
            created_at: new Date(),
            updated_at: new Date()
        })
        post.save().then((post)=>{
            res.send(post);
        }).catch((err)=>{
            next(err)
        })
    }

    static async getPostByUser(req,res,next) {
        const userId = req.user.user_id;
        try {
            const posts = await Post.find({user_id: userId}, {user_id: 0, __v: 0}).populate('comments').exec();
            res.send(posts);
        } catch (e) {
            next(e)
        }
    }   
}