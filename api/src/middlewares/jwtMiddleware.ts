import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        req.decoded = await jwt.verify(req.headers.authorization, process.env.SECRET);
        console.log(req.decoded);
        next();
    } catch ({ message }) {
        res.status(401).send(message)
    }
}