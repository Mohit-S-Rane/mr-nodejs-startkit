import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable } from './environment/env';
import UserRouter from './routers/UserRouter';
import PostRouter from './routers/PostRouter';
import CommentRouter from './routers/CommentRouter';
import bodyParser = require('body-parser');
import { Jobs } from './jobs/Jobs';

export class Server{
    public app:express.Application = express();
    constructor(){
        this.setConfiguration();
        this.setRoutes();
        this.error404Handler();
        this.handleError();

    }

    setConfiguration(){
        this.connectMongoDb();
        this.configureBodyParser();
        Jobs.runRequiredJobs();
    }

    connectMongoDb(){
        const databaseUrl = getEnvironmentVariable().db_url;
        mongoose.connect(databaseUrl).then(()=>{
            console.log('Connected to MongoDB');        
        })
    }

    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    setRoutes(){
        this.app.use('/src/uploads', express.static('src/uploads'))
        this.app.use('/api/user', UserRouter)
        this.app.use('/api/post', PostRouter)
        this.app.use('/api/comment', CommentRouter)
    }

    error404Handler(){
        this.app.use((req, res)=>{
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            })
        })
    }

    handleError(){
        this.app.use((error,req,res,next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            })
        })
    }
}