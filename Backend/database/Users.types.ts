import { Document, Model } from "mongoose";


//this part is a bit new to me, but typescript requires an interface for the model like this. 
//the interface allows us to literally extend to the model to create a user. 
export interface IUser {
    firstName: String;
    lastName: String;
    age: number;
    dateOfEntry?: Date;
    lastUpdated?: Date;
  };
  
  export interface IUserDocument extends IUser, Document {
    setLastUpdated: (this: IUserDocument) => Promise<void>;
    sameLastName: (this: IUserDocument) => Promise<Document[]>;
    }
export interface IUserModel extends Model<IUserDocument> {
    findOneOrCreate: (
      this: IUserModel,
      {
        firstName,
        lastName,
        age,
      }: { firstName: string; lastName: string; age: number }
    ) => Promise<IUserDocument>;
 
  };