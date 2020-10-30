import mongoose from 'mongoose';
 
interface IUser{
    firstName: String;
    lastName: String;
    email: String;
}

interface UserDoc extends mongoose.Document{
    firstName: String,
    lastName: String,
    email: String
}

interface userModelInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //required: true
    },
    lastName:{
        type: String,
        //required: true
    },
    email:{ 
        type: String, 
        //required: true
    }
})
userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}
const User = mongoose.model<UserDoc,userModelInterface>('User', userSchema )

export{ User }



