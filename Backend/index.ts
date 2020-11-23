import express from 'express';
import { userRouter } from './apiAdapter/users';
import {json} from 'body-parser'
import {AddressInfo} from 'net';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors());

app.use(json())

app.use('/api/users', userRouter)

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${(server.address() as AddressInfo).port}`);
});