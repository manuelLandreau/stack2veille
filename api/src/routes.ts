import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';
import JwtMiddleware from "./middlewares/jwtMiddleware";

export const routes = [{
    method: 'post',
    route: '/auth/login',
    controller: AuthController,
    action: 'login'
}, {
    method: 'get',
    route: '/user/me',
    middleware: JwtMiddleware,
    controller: UserController,
    action: 'me'
}];
