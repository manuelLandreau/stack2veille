import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';
import 'dotenv/config'

// import { User } from './entity/User';
// const bcrypt = require('bcrypt');

createConnection()
    .then(async connection => {

    // create express app
    const app: express.Application = express();
    app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
    routes.forEach(route => {
        (app as any)[route.method](
            route.route,
            route.middleware ? route.middleware : (_, __, next) => { next() },
            async (req: any, res: any, next: Function) => {
                await (new (route.controller as any))[route.action](req, res, next);
            });
    });

    // start express server
    app.listen(process.env.PORT);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     username: 'test',
    //     email: 'test@test.com',
    //     password: bcrypt.hashSync('test', 10),
    //     optin: true
    // }));

    console.log(`Express server has started on port ${process.env.PORT}.`);

}).catch(console.log);
