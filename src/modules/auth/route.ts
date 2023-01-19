import { Application } from 'express';
import { AuthController } from './controller';

export class AuthRoute {
    public routes(app: Application): void {
        app.route('/auth/login')
            .post(new AuthController().login);

        app.route('/auth/register')
            .post(new AuthController().register);
    }
}