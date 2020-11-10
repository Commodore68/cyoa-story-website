

interface Chapter {
    id: string,
    authorId: string,
    storyId: string,
    parent: string,
    title: string,
    content: string,
    previousQuestion: string, // the question from the previous node
    nextQuestion: string, // the question from the end of the current
    children: string[],
    dateUpdated: Date,
    dateCreated: Date,
}

export {Chapter};
