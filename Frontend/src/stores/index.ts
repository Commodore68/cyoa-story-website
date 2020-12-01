import {observable} from 'mobx';
import {Author} from "../../../Backend/types/Author";
import {Chapter} from "../../../Backend/types/Chapter";
import {Story} from "../../../Backend/types/Story";

interface storyStoreType {
    _isLoading: boolean,
    story: Story
}

interface chapterStoreType {
    _isLoading: boolean,
    chapter: Chapter
}

interface authorStoreType {
    _isLoading: boolean,
    author: Author
}

const storyStoreTemp: storyStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    story: {}
};

const chapterStoreTemp: chapterStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chapter: {}
};

const currentAuthorStoreTemp: authorStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    author: {}
};

const viewingAuthorStoreTemp: authorStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    author: {}
};

export const storyStore = observable(storyStoreTemp);

export const chapterStore = observable(chapterStoreTemp);

export const currentAuthorStore = observable(currentAuthorStoreTemp);

export const viewingAuthorStore = observable(viewingAuthorStoreTemp); //for the profile page that is being viewed
