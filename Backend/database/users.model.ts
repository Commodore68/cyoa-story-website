import { model } from "mongoose";
import { IUserDocument } from "./Users.Types";
import UserSchema from "./Users.Schema";
//this is a simple file to put the type and schema together to create a working model.

export const UserModel = model<IUserDocument>("User", UserSchema);