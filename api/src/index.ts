import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import { User } from './entity/User';
import 'dotenv/config'
const bcrypt = require('bcrypt');

createConnection().then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
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
    //     password: bcrypt.hashSync('test', 10)
    // }));

    console.log(`Express server has started on port ${process.env.PORT}. Open http://localhost:${process.env.PORT} to see results`);

}).catch(error => console.log(error));
