import { Request, Response} from 'express';
// import { getRepository } from 'typeorm';
// import { User } from '../entity/User';

export class AuthController {

    // private userRepository = getRepository(User);

    login(request: Request, response: Response) {
        return new Promise(resolve => {
            setTimeout(() => resolve('token__'), 1000)
        });
    }
}
