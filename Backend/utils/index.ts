import {Author} from '../types/Author'
import {Chapter} from "../types/Chapter";
import {Story} from "../types/Story";

export function isAuthor(argument: any): argument is Author {
    return argument.userName !== undefined;
}

export function isAllAuthorsArray(argument:any) : argument is Array<Author> {
    return argument[0].values !== undefined;
}

export function isChapter(argument:any): argument is Chapter{
    return argument.values !== undefined;
}

export function allChapters(argument: any): argument is Array<Chapter>{
    return argument[0]!== undefined;
}
export function isAStory(argument:any): argument is Story {
    return argument.title!== undefined;
}
export function allStories(argument:any): argument is Array<Story>{
    return argument[0]!== undefined;
}
