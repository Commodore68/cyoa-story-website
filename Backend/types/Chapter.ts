interface ChildChapter{
    id: string,
    heading: string,
}
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
    children: Array<ChildChapter>,
    dateUpdated: Date,
    dateCreated: Date,
}

export {Chapter, ChildChapter};
