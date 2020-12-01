import {NextFunction, Request, Response} from "express";
import {
    findOneWrapper, findWrapper,
    insertOneWrapper,
    mongoConnectWrapper,
    MongoCRUDFunction,
    MongoManyCRUDParams,
    MongoSingleCRUDParams, updateOneWrapper
} from "../database/mongo";
import {isStringArray} from "../utils";


export async function chapterController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        story,
        author,
        type
    } = req.body;

    let params = <MongoSingleCRUDParams | MongoManyCRUDParams> {
        collection: 'chapters',
    };

    let f: MongoCRUDFunction;
    if (type === 'insert-one') {
        f = insertOneWrapper;
        params = {
            ...params,
            data,
            filter: {}
        };
    } else if (type === 'find-one') {
        f = findOneWrapper;
        params = {
            ...params,
            filter: {
                id: data.id
            }
        };
    } else if (type === 'find-many') {
        f = findWrapper;

        if (isStringArray(data)) {
            //all searches should put the terms to search in a string array, even if there is only one string
            const searchArray = data.map((item) => {
                return {
                    $regex: item,
                    $options: 'i'
                }
            });

            params = {
                ...params,
                filter: {
                    $or: [
                        {
                            heading: {
                                $in: searchArray
                            }
                        },
                        {
                            content: {
                                $in: searchArray
                            }
                        }
                    ]
                }
            }
        } else if (author !== undefined) {
            //if we want to show all the chapters for a single user
            params = {
                ...params,
                filter: {
                    authorId: author
                }
            }
        } else {
            // if we want to get all the chapters for a single story
            params = {
                ...params,
                filter: {
                    storyId: story
                }
            }
        }
    } else if (type === 'update-one') {
        f = updateOneWrapper;
        params = {
            ...params,
            data: {
                $push: {
                    children: {
                        id: data.id,
                        heading: data.heading
                    }
                }
            },
            filter: {
                id: data.parent
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
