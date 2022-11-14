"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const env_1 = require("./environment/env");
const UserRouter_1 = require("./routers/UserRouter");
const PostRouter_1 = require("./routers/PostRouter");
const CommentRouter_1 = require("./routers/CommentRouter");
const bodyParser = require("body-parser");
const Jobs_1 = require("./jobs/Jobs");
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
    }
    setConfiguration() {
        this.connectMongoDb();
        this.configureBodyParser();
        Jobs_1.Jobs.runRequiredJobs();
    }
    connectMongoDb() {
        const databaseUrl = (0, env_1.getEnvironmentVariable)().db_url;
        mongoose.connect(databaseUrl).then(() => {
            console.log('Connected to MongoDB');
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handleError() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
