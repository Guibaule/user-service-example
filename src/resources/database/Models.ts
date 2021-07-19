import mongoose from "mongoose";
import { IUserDocument } from "./model/UserModel";
import UserSchema from "./schema/UserSchema";

export const userModel = mongoose.model<IUserDocument>('User', UserSchema);
