import { Request, Response } from 'express';
// import { getRepository } from 'typeorm';
// import { User } from '../entity/User';

export class UserController {

    async me(request: Request, response: Response) {
        return new Promise(resolve => resolve({ username: 'manu', email: 'manu@test', optin: true }));
    }

    // private userRepository = getRepository(User);
    //
    // async all(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.find();
    // }
    //
    // async one(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.findOne(request.params.id);
    // }
    //
    // async save(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.save(request.body);
    // }
    //
    // async remove(request: Request, response: Response, next: NextFunction) {
    //     let userToRemove = await this.userRepository.findOne(request.params.id);
    //     await this.userRepository.remove(userToRemove);
    // }

}
