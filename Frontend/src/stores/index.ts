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

interface currentAuthorStoreType {
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

const currentAuthorStoreTemp: currentAuthorStoreType = {
    _isLoading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    author: {}
};

export const storyStore = observable(storyStoreTemp);

export const chapterStore = observable(chapterStoreTemp);

export const currentAuthorStore = observable(currentAuthorStoreTemp);
