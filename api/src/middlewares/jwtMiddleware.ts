import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

export default async function (req: Request, res: Response, next: Function) {
    try {
        req.decoded = await jwt.verify(req.headers.authorization, process.env.SECRET);
        next();
    } catch(err) {
        res.status = 401;
        res.json({ error: err.message });
    }
}