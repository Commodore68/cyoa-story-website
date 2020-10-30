import mongoose from 'mongoose';

interface Chapter extends mongoose.Document {
    id: string,
    authorId: string,
    storyId: string,
    parent: string,
    title: string,
    content: string,
    previousQuestion: string, // the question from the previous node
    nextQuestion: string, // the question from the end of the current
    children: string[],
}

export {Chapter};
