import express, {Request, Response} from 'express'
import {authorController} from "../controllers/AuthorController";
import {chapterController} from "../controllers/ChapterController";
import {storyController} from "../controllers/StoryController";


const router = express.Router();

router.use('/authors', authorController);
router.use('/chapter', chapterController);
router.use('/story', storyController);

export default router;