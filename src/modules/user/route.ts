import { Application } from 'express';
import isAuthorized from '../../helpers/isAuthorized';
import { isAuthenticated } from '../../helpers/TokenHelper';
import { UserController } from './controller';

export class UserRoute {
    public routes(app: Application): void {
        app.route('/user/:id')
            .get(isAuthenticated, isAuthorized(["READ_USER"]), new UserController().getUser)
            .put(isAuthenticated, isAuthorized(["UPDATE_USER"]), new UserController().updateUser)
            .patch(isAuthenticated, isAuthorized(["UPDATE_USER"]), new UserController().updatePassword)
            .delete(isAuthenticated, isAuthorized(["DELETE_USER"]), new UserController().deleteUser);

        app.route('/user/username/:username')
            .get(new UserController().getUserByUsername);

        app.route('/users')
            .get(isAuthenticated, isAuthorized(["READ_USER"]), new UserController().getUsers);

        app.route('/user')
            .post(isAuthenticated, isAuthorized(["CREATE_USER"]), new UserController().createUser)
    }
}