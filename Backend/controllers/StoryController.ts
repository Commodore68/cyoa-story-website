import {NextFunction, Request, Response} from "express";
import {
    findOneWrapper,
    insertOneWrapper,
    mongoConnectWrapper,
    MongoCRUDFunction,
    MongoManyCRUDParams,
    MongoSingleCRUDParams
} from "../database/mongo";


export async function storyController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        author,
        type
    } = req.body;

    let params = <MongoSingleCRUDParams | MongoManyCRUDParams> {
        collection: 'stories',
    };

    let f: MongoCRUDFunction;
    if (type === 'insert-one') {
        f = insertOneWrapper;
        params = {
            ...params,
            data,
            filter: {}
        }
    } else if (type === 'find-one') {
        f = findOneWrapper;
        params = {
            ...params
        };
    }




    const result = await mongoConnectWrapper({
        CRUDFunction: f,
        params
    });


    res.status(200).send({data: result});
}




