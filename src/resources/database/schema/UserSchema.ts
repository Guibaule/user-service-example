import { Schema } from "mongoose";

export default new Schema({
    user: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    }
})
