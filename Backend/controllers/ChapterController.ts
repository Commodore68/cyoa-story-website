import {NextFunction, Request, Response} from "express";
import {mongoConnectWrapper, MongoCRUDFunction, MongoManyCRUDParams, MongoSingleCRUDParams} from "../database/mongo";


export async function chapterController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        story,
        type
    } = req.body;

    let params = <MongoSingleCRUDParams | MongoManyCRUDParams> {
        collection: 'chapters',
    };

    let f: MongoCRUDFunction;







    const result = await mongoConnectWrapper({
        CRUDFunction: f,
        params
    });


    res.status(200).send({data: result});
}


