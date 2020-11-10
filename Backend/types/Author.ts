

interface Author {
    id: string,
    isAdmin: boolean,
    firstName: string,
    lastName: string,
    email: string,
    storyBookmarks: string[],
    chapterBookmarks: string[],
    createdStories: string[],
    createdChapters: string[],
    dateJoined: Date,
}

export {Author};
