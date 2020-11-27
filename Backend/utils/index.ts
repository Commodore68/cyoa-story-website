import {Author} from '../types/Author'
import {Chapter} from "../types/Chapter";
import {Story} from "../types/Story";

export function isAuthor(argument: any): argument is Author {
    return argument.userName !== undefined;
}

export function isAuthorArray(argument: any): argument is Array<Author> {
    return argument[0].userName !== undefined;
}

export function isChapter(argument: any): argument is Chapter {
    return argument.heading !== undefined;
}

export function isChapterArray(argument: any): argument is Array<Chapter> {
    return argument[0].heading !== undefined;
}
export function isStory(argument: any): argument is Story {
    return argument.title !== undefined;
}
export function isStoryArray(argument: any): argument is Array<Story> {
    return argument[0].title !== undefined;
}
