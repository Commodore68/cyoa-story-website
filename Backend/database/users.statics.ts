import { IUserDocument, IUserModel } from "./Users.Types";



export async function findOneOrCreate(
    this: IUserModel,
    userId: string
  ): Promise<IUserDocument> {
    const record = await this.findOne({ userId });
    if (record) {
      return record;
    }else {
        return this.create({userId});
    }
  };
  
