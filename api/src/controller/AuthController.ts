import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthController {

    private userRepository = getRepository(User);

    async login(req: Request, res: Response) {
        const { email, password } = req.body.data

        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        if (!!user) {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    res.status = 200
                    res.json({ token: await jwt.sign(user.email, process.env.SECRET) });
                }
            } catch (e) { res.json({ error: e.message }) }
        } else {
            res.status = 401
            res.json({ error: 'Email not found' });
        }
    }
}
