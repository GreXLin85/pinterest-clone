import { Application } from 'express';
import checkPermissions from '../../helpers/CheckPermissions';
import { verifyToken } from '../../helpers/TokenHelper';
import { UserController } from './controller';

export class UserRoute {
    public routes(app: Application): void {
        app.route('/user/:id')
            .get(verifyToken, checkPermissions(["READ_USER"]), new UserController().getUser)
            .put(verifyToken, checkPermissions(["UPDATE_USER"]), new UserController().updateUser)
            .patch(verifyToken, checkPermissions(["UPDATE_USER"]), new UserController().updatePassword)
            .delete(verifyToken, checkPermissions(["DELETE_USER"]), new UserController().deleteUser);

        app.route('/user/username/:username')
            .get(new UserController().getUserByUsername);

        app.route('/users')
            .get(verifyToken, checkPermissions(["READ_USER"]), new UserController().getUsers);

        app.route('/user')
            .post(verifyToken, checkPermissions(["CREATE_USER"]), new UserController().createUser)
    }
}