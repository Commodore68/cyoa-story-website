import {NextFunction, Request, Response} from "express";
import {
    findOneWrapper,
    findWrapper,
    insertOneWrapper,
    updateOneWrapper,
    mongoConnectWrapper,
    MongoCRUDFunction,
    MongoManyCRUDParams,
    MongoSingleCRUDParams,
} from "../database/mongo";


export async function authorController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        type
    } = req.body;


    let params = <MongoSingleCRUDParams | MongoManyCRUDParams> {
        collection: 'users',
    };

    let f: MongoCRUDFunction;
    if (type === 'insert-one') {
        f = insertOneWrapper;
        params = {
            ...params,
            data,
            filter: {},
        }
    } else if (type === 'find-one') {
        f = findOneWrapper;
        params = {
            ...params,
            data: {},
            filter: {
                id: data.id
            }
        }
    } else if (type === 'find-many') {
        //the data here should be a string for the userName the frontend wants to search
        //todo: this needs to work for partial userNames
        f = findWrapper;
        params = {
            ...params,
            data: {},
            filter: {
                userName: {$in: data}
            }
        }
    } else if (type === 'update-one') {
        f = updateOneWrapper;
        params = {
            ...params,
            data: {
                $set: data
            },
            filter: {
                id: data.id
            },
            options: {
                upsert: true //create a document if no documents matched the search
            }
        }
    } else {
        res.sendStatus(400);
        throw new Error('Invalid type in request');
    }



    const result = await mongoConnectWrapper({
        CRUDFunction: f,
        params
    });


    res.status(200).send({data: result});
}
