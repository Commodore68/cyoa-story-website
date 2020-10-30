import mongoose from 'mongoose';

interface Story extends mongoose.Document {
    id: string,
    authorId: string,
    title: string,
    summary: string,
    tags: string[],
    genre: string,
    subGenre?: string | null,
    contentRating: 'PG' | 'PG-13' | 'Mature' | 'Corn' | null,
    firstNode: string
}

export {Story};
