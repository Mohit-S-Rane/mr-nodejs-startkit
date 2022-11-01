import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable } from './environment/env';

export class Server{
    public app:express.Application = express();
    constructor(){
        this.setConfiguration();
    }

    setConfiguration(){
        this.connectMongoDb();
    }

    connectMongoDb(){
        mongoose.connect(getEnvironmentVariable().db_url).then(()=>{
            console.log('Connected to MongoDB');        
        })
    }
}