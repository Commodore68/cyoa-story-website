import {NextFunction, Request, Response} from "express";
import {
    findOneWrapper, findWrapper,
    insertOneWrapper,
    mongoConnectWrapper,
    MongoCRUDFunction,
    MongoManyCRUDParams,
    MongoSingleCRUDParams, replaceOneWrapper, updateOneWrapper
} from "../database/mongo";
import {isStringArray} from "../utils";


export async function storyController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        author,
        genre,
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
            ...params,
            filter: {
                id: data.id
            },
            options: {
                projection: {'_id': 0}
            }
        };
    } else if (type === 'find-many') {
        f = findWrapper;

        if (author === undefined && data === undefined && genre === undefined) {
            params = {
                ...params,
                filter: {},
                options: {
                    '_id': 0
                    //todo: limit the results to 10 and sort by most recent
                }
            }
        } else if (author !== undefined) {
            //if we want to show all the stories for a single user
            params = {
                ...params,
                filter: {
                    authorId: author
                },
                options: {
                    '_id': 0
                }
            }
        } else if (isStringArray(data)) {
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
                            title: {
                                $in: searchArray
                            }
                        },
                        {
                            summary: {
                                $in: searchArray
                            }
                        },
                        {
                            tags: {
                                $in: searchArray
                            }
                        }
                    ]
                },
                options: {
                    '_id': 0
                }
            }
        } else {
            //we pass this in as a string array bc it should only be happening from the search page
            //if we want to search stories by genre
            params = {
                ...params,
                filter: {
                    $or: [
                        {
                            genre: genre[0]
                        },
                        {
                            subGenre: genre[0]
                        }
                    ]
                },
                options: {
                    '_id': 0
                }
            }
        }
    } else if (type === 'replace-one') {
        f = replaceOneWrapper;
        params = {
            ...params,
            data,
            filter: {
                id: data.id
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
