import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: String, required: true, default: false},
    verification_token: {type: Number, required: true},
    verification_time: {type: Date, required: true},
    username: {type: String, required: true},
    created_at: {type: String, required: true, default: new Date()},
    updated_at: {type: String, required: true, default: new Date()}
})

export default model('user', userSchema)