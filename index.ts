import express from 'express';
import { connect } from "./backend/database/database";

const app = express();
const PORT = 8050;

connect();

app.get('/', (req,res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT} thank you very much`);

});