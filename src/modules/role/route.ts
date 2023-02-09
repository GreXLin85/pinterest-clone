import { Application } from 'express';
import isAuthorized from '../../helpers/isAuthorized';
import { isAuthenticated } from '../../helpers/TokenHelper';
import { RoleController } from './controller';

export class RoleRoute {
    public routes(app: Application): void {
        app.route('/role/:id')
            .get(isAuthenticated, isAuthorized(["READ_ROLE"]), new RoleController().getRole)
            .put(isAuthenticated, isAuthorized(["UPDATE_ROLE"]), new RoleController().updateRole)
            .delete(isAuthenticated, isAuthorized(["DELETE_ROLE"]), new RoleController().deleteRole);

        app.route('/role/name/:name')
            .get(isAuthenticated, isAuthorized(["READ_ROLE"]), new RoleController().getRoleByName);

        app.route('/roles')
            .get(isAuthenticated, isAuthorized(["READ_ROLE"]), new RoleController().getRoles);

        app.route('/role')
            .post(isAuthenticated, isAuthorized(["CREATE_ROLE"]), new RoleController().createRole)
    }
}