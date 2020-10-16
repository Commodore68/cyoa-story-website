import Mongoose from "mongoose";

let database: Mongoose.Connection;


export const connect = () => {  
  
    const uri = "mongodb+srv://jshevi2:StoryArc@cluster0.6fefk.azure.mongodb.net/<STORY_ARC>?retryWrites=true&w=majority";
    
    if (database) {
    return;
        }

    Mongoose.connect(uri, {
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
    }); 
        
        
    database = Mongoose.connection;  database.once("open", async () => {
      console.log("Connected to database");
    });  
    
    database.on("error", () => {
      console.log("Error connecting to database");
    });
  
};
        
export const disconnect = () => {  if (!database) {
          return;
        }  
    Mongoose.disconnect();
     
};