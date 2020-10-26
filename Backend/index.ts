import express from 'express';
import { connect } from "./database/database";
import { userRouter } from './Frontend/src/routes/users';
import {json} from 'body-parser'

const app = express();
const PORT = 8050;

connect();

app.use(json())

app.use(userRouter)

app.listen(PORT, () => {
  
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}, thank you very much`);

});