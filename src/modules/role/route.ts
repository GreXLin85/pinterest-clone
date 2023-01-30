import { Application } from 'express';
import checkPermissions from '../../helpers/CheckPermissions';
import { verifyToken } from '../../helpers/TokenHelper';
import { RoleController } from './controller';

export class RoleRoute {
    public routes(app: Application): void {
        app.route('/role/:id')
            .get(verifyToken, checkPermissions(["READ_ROLE"]), new RoleController().getRole)
            .put(verifyToken, checkPermissions(["UPDATE_ROLE"]), new RoleController().updateRole)
            .delete(verifyToken, checkPermissions(["DELETE_ROLE"]), new RoleController().deleteRole);

        app.route('/role/name/:name')
            .get(verifyToken, checkPermissions(["READ_ROLE"]), new RoleController().getRoleByName);

        app.route('/roles')
            .get(verifyToken, checkPermissions(["READ_ROLE"]), new RoleController().getRoles);

        app.route('/role')
            .post(verifyToken, checkPermissions(["CREATE_ROLE"]), new RoleController().createRole)
    }
}