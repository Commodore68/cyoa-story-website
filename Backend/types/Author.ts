

interface Author {
    id: string,
    isAdmin: boolean,
    userName: string,
    picture: string,
    email: string,
    storyBookmarks: string[],
    chapterBookmarks: string[],
    createdStories: string[],
    createdChapters: string[],
    dateJoined: Date,
}

export {Author};
