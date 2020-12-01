

interface Author {
    id: string,
    isAdmin: boolean,
    userName: string,
    picture: string,
    email: string,
    bio: string,
    storyBookmarks: string[],
    chapterBookmarks: string[],
    createdStories: string[],
    createdChapters: string[],
    dateJoined: string,
}

export {Author};
