import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';

export const Routes = [{
    method: 'post',
    route: '/auth/login',
    controller: AuthController,
    action: 'login'
}, {
    method: 'get',
    route: '/user/me',
    controller: UserController,
    action: 'me'
}];
