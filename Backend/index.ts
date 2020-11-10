import express from 'express';
import { connect } from "./database/database";
import { userRouter } from './apiAdapter/users';
import {json} from 'body-parser'
import {AddressInfo} from 'net';

require('dotenv').config();

const app = express();

connect();

app.use(json())

app.use(userRouter)

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${(server.address() as AddressInfo).port}`);
});