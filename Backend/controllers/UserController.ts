import {NextFunction, Request, Response} from "express";
import {
    findOneWrapper,
    findWrapper,
    insertOneWrapper,
    updateOneWrapper,
    updateManyWrapper,
    mongoConnectWrapper,
    MongoCRUDFunction,
    MongoManyCRUDParams,
    MongoSingleCRUDParams,
} from "../database/mongo";


export async function userController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        game,
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
        //For this if we are expecting an array of GameUsers from the frontend
        if (!isGameUserArray(data)) {
            throw new Error('Invalid data in request, Expected GameUser[]')
        } else {
            const _data = data.map((item) => item.id);
            f = findWrapper;
            params = {
                ...params,
                data: {},
                filter: {
                    id: {$in: _data}
                }
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
    } else if (type === 'update-many') {
        //this operation should only happen when a game is first created
        //For this if we are expecting an array of GameUsers from the frontend
        if (!isGameUserArray(data)) {
            throw new Error('Invalid data in request, Expected GameUser[]')
        } else {
            const _data = data.map((item) => item.id);
            f = updateManyWrapper;
            params = {
                ...params,
                data: {
                    $push: {
                        games: {
                            $each: [game],
                            $position: 0
                        }
                    }
                },
                filter: {
                    id: {$in: _data}
                }
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
