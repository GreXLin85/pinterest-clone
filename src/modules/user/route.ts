import { Application } from 'express';
import { UserController } from './controller';

export class UserRoute {
    public routes(app: Application): void {
        app.route('/user/:id')
            .get(new UserController().getUser);

        app.route('/user/username/:username')
            .get(new UserController().getUserByUsername);

        app.route('/users')
            .get(new UserController().getUsers);

        app.route('/user')
            .post(new UserController().createUser)
            .put(new UserController().updateUser)
            .delete(new UserController().deleteUser);
    }
}