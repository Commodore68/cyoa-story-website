import mongoose from 'mongoose';

interface Author extends mongoose.Document {
    id: string,
    isAdmin: boolean,
    firstName: string,
    lastName: string,
    email: string,
    storyBookmarks: string[],
    chapterBookmarks: string[],
    createdStories: string[],
    createdChapters: string[],
}

export {Author};
