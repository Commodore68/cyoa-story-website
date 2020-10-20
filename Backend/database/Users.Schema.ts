// Here is where we define the Mongoose Schema for the Users, which determines the shape of our MongoDB documents
//consider this to be the blueprint. without this, the Data cannot take shape in the cluser

import {Schema} from "mongoose"; // <-- this import is a module from Mongoose. let's us create our blueprint
import { findOneOrCreate } from "./users.statics";
import { setLastUpdated, sameLastName } from "./users.methods";

//on this line we create our new schema with the function initialized below
const UserSchema = new Schema({
    firstName : String, //<-- this is the first name declared as a String input
    lastName : String, //<-- last name
    dateOfEntry : { //<-- here we create a date for the beginning of the user's account
        type : Date,
        default: new Date()
    },
    lastUpdated : { //<-- this will be when a user creates a new story or edits their account page
        type : Date,
        default: new Date()
    }
});
UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.methods.sameLastName = sameLastName;

export default UserSchema;