interface Story {
    id: string,
    authorId: string,
    dateUpdated: Date,
    dateCreated: Date,
    title: string,
    summary: string,
    tags: string[],
    genre: string,
    subGenre?: string | null,
    contentRating: 'PG' | 'PG-13' | 'Mature' | 'Corn' | null,
    firstNode: string
}

export {Story};
