import {AddressInfo} from "net";
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path";

require('dotenv').config();

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

//app.get('/', (req: Request,res: Response) => res.status(200).send('Express + TypeScript Server'));

app.use('/test', (req: Request, res: Response) => {
    res.status(200).send({test: 'test response'})
});

app.use('/api', require('./apiAdapter'))

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use('/dist', express.static(path.join(__dirname, '..', 'Frontend/dist')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'Frontend/dist', 'index.html'));
    });
}

const server = app.listen(process.env.PORT || 3000, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`⚡️[server]: Server is running at http://localhost:${(server.address() as AddressInfo).port}`);
    }
    else if (process.env.NODE_ENV === 'production') {
        console.log(`⚡️[server]: Server is running at https://this has not been created yet:${(server.address() as AddressInfo).port}`);
    }
});

module.exports = app;
