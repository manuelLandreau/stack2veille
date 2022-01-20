import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export class UserController {

    private userRepository = getRepository(User);

    async me(req: Request, res: Response) {
        const user = await this.userRepository.findOne({ email: req.decoded });
        if (user) {
            res.status = 200;
            res.json(user);
        } else {
            res.status = 404;
            res.json({ error: 'User not found' });
        }
    }

    // async all(req: Request, res: Response, next: NextFunction) {
    //     return this.userRepository.find();
    // }
    //
    // async one(req: Request, res: Response, next: NextFunction) {
    //     return this.userRepository.findOne(req.params.id);
    // }
    //
    // async save(req: Request, res: Response, next: NextFunction) {
    //     return this.userRepository.save(req.body);
    // }
    //
    // async remove(req: Request, res: Response, next: NextFunction) {
    //     let userToRemove = await this.userRepository.findOne(req.params.id);
    //     await this.userRepository.remove(userToRemove);
    // }

}
