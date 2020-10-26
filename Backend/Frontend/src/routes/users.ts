import express, {Request, Response} from 'express'
import {User} from './models/UsersM'

const router = express.Router();

router.get('/api/users', async (req: Request,res: Response) => {
    const user = await User.find({})
    return res.status(200).send(user)
})
router.post('/api/users/post', async (req: Request,res: Response)=> {
   const {firstName, lastName, email } = req.body;
    const user = User.build({firstName, lastName, email})
    await user.save()
    return res.status(201).send(user)
})

export {router as userRouter}