import { Document, Model } from "mongoose";

export interface IUser {
    user: String,
    pwd: String,
    createdAt: Date,
    updatedAt?: Date
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
