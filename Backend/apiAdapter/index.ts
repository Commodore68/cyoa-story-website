import express from 'express'
import {authorController} from "../controllers/AuthorController";
import {chapterController} from "../controllers/ChapterController";
import {storyController} from "../controllers/StoryController";


const router = express.Router();

router.use('/authors', authorController);
router.use('/chapters', chapterController);
router.use('/stories', storyController);

export default router;