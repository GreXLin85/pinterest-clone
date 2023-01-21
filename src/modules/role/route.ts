import { Application } from 'express';
import { RoleController } from './controller';

export class RoleRoute {
    public routes(app: Application): void {
        app.route('/role/:id')
            .get(new RoleController().getRole)
            .put(new RoleController().updateRole)
            .delete(new RoleController().deleteRole);

        app.route('/role/name/:name')
            .get(new RoleController().getRoleByName);

        app.route('/roles')
            .get(new RoleController().getRoles);

        app.route('/role')
            .post(new RoleController().createRole)
    }
}