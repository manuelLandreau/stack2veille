import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { timeStamp } from 'console';
const createHttpError = require("http-errors");

export class AuthController {

    private userRepository = getRepository(User);

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body.data

        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        if (!!user) {
            try {
                if (bcrypt.compareSync(password, user.password)) 
                    res.status(200).json({ token: await jwt.sign(user.email, process.env.SECRET) });
                else res.status(401).send('Wrong password')
            } catch { res.status(500).send('Something happend') }
        } else {
            res.status(401).send('Email not found')
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        res.status(500).send('server error')
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        res.status(201).json({ token: await jwt.sign(req.decoded, process.env.SECRET) });
    }
}
