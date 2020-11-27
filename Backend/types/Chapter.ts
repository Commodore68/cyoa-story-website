
interface Chapter {
    id: string,
    authorId: string,
    authorName: string,
    storyId: string,
    parent: string,
    heading: string,
    content: string,
    previousQuestion: string, // the question from the previous node
    nextQuestion: string, // the question from the end of the current
    children: string[],
    dateUpdated: Date,
    dateCreated: Date,
}

export {Chapter};
