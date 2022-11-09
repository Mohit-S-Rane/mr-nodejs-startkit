import { validationResult } from "express-validator";
import Post from "../models/Post";
import { Utils } from "./../utils/Utils";
import { NodeMailer } from "./../utils/NodeMailer";
import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariable } from "../environment/env";

export class PostController {
  static addPost(req, res, next) {
    const userId = req.user.user_id;
    const content = req.body.content;
    const post = new Post({
      user_id: userId,
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
    });
    post
      .save()
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        next(err);
      });
  }

  static async getPostByUser(req, res, next) {
    const userId = req.user.user_id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 2;
    let currentPage = page;
    let prevPage = page === 1 ? null : page - 1;
    let pageToken = page + 1;
    let totalPages;
    try {
      const postCount = await Post.countDocuments({ user_id: userId });
      totalPages = Math.ceil(postCount / perPage);
      if (totalPages === page || totalPages === 0) {
        pageToken = null;
      }
      if (page > totalPages) {
        throw new Error("No More Post To Show");
      }
      const posts: any = await Post.find({ user_id: userId }, { __v: 0, user_id: 0 })
        .populate("comments")
        .skip(perPage * page - perPage)
        .limit(perPage);

      res.json({
        post: posts,
        pageToken: pageToken,
        totalpages: totalPages,
        currentPage: currentPage,
        prevPage: prevPage,
        count: posts[0].commentCount
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllPosts(req, res, next) {
    const userId = req.user.user_id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 2;
    let currentPage = page;
    let prevPage = page === 1 ? null : page - 1;
    let pageToken = page + 1;
    let totalPages;
    try {
      const postCount = await Post.estimatedDocumentCount();
      totalPages = Math.ceil(postCount / perPage);
      if (totalPages === page || totalPages === 0) {
        pageToken = null;
      }
      if (page > totalPages) {
        throw new Error("No More Post To Show");
      }
      const posts = await Post.find({}, { __v: 0, user_id: 0 })
        .populate("comments")
        .skip(perPage * page - perPage)
        .limit(perPage);

      res.json({
        post: posts,
        pageToken: pageToken,
        totalpages: totalPages,
        currentPage: currentPage,
        prevPage: prevPage,
      });
    } catch (e) {
      next(e);
    }
  }
}
