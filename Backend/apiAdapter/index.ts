import express, {Request, Response} from 'express'
import {userController} from "../controllers/UserController";


const router = express.Router();

router.use('/user', userController)

export default router;