import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';
import JwtMiddleware from './middlewares/jwtMiddleware';
import { Express } from 'express';

type HTTPMethod = 'get'|'post'|'update'|'patch'|'delete'

type Route = { method: HTTPMethod, route: string, middleware?: Express.RequestHandler, controller: object, action: string }

export const routes: Route[] = [{
    method: 'post',
    route: '/auth/login',
    controller: AuthController,
    action: 'login'
}, {
    method: 'post',
    route: '/auth/register',
    controller: AuthController,
    action: 'register'
}, {
    method: 'get',
    route: '/auth/refresh',
    middleware: JwtMiddleware,
    controller: AuthController,
    action: 'refresh'
}, {
    method: 'get',
    route: '/user/me',
    middleware: JwtMiddleware,
    controller: UserController,
    action: 'me'
}];
