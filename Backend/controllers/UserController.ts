import {NextFunction, Request, Response} from "express";
import {findOneWrapper, insertOneWrapper, mongoConnectWrapper, MongoCRUDFunction} from "../database/mongo";


export async function userController(req: Request, res: Response, next: NextFunction) {
    const {
        user,
        type
    } = req.body;


    let f: MongoCRUDFunction;
    if (type === 'insert-one') {
        f = insertOneWrapper;
    } else if (type === 'find-one') {
        f = findOneWrapper;
    } else {
        res.sendStatus(400);
        throw new Error('Invalid type in request');
    }


    const result = await mongoConnectWrapper({
        CRUDFunction: f,
        params: {
            collection: 'users',
            data: user,
            filter: {}
        }
    });


    res.status(200).send({data: result});
}
