import {Db, MongoClient} from "mongodb";

const uri: string = (process.env.DB_URL as string)

//todo: this will need to be updated with more objects and/or types as we know what to pass to it
export interface MongoCRUDParams {
    collection: string,
    data: { [key: string]: any }[] | { [key: string]: any }
}

//todo: figure out the types we need to return other than void
type MongoCRUDFunction = (db: Db, otherArgs: MongoCRUDParams) => void | Object

export interface MongoConnectionParams {
    callback: MongoCRUDFunction,
    params: MongoCRUDParams
}

//todo: look into creating indexes
export function mongoConnectWrapper(args: MongoConnectionParams) {
    const {callback, params} = args;

    let result = null;

    MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
        if (err) {
            throw err;
        }

        const db = client.db();

        result = callback(db, params);

        client.close((error) => {
            console.log(`An error occurred closing the client: ${error}`);
        });
    });

    return result;
}

export const insertOneWrapper: MongoCRUDFunction = (db, otherArgs) => {
    const {collection, data} = otherArgs;

    db.collection(collection).insertOne(data, (error, res) => {
        if (!error) {
            console.log(`Insert Completed successfully: ${res.result.ok}`);
        } else {
            console.log(`An error occurred: ${error}`);
        }
    });
}
