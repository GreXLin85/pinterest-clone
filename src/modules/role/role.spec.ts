import request from 'supertest';
import { sign } from '../../helpers/JWTHelper';
import app from '../../server';

describe('Role', () => {
    let roleId: number;
    let token: string;
    beforeAll(async () => {
        token = sign(1);
    });

    it('should create a new role', async () => {
        const response = await request(app)
            .post('/role')
            .set('x-access-token', token)
            .send({
                name: "TEST_ROLE",
                permission: [
                    "CREATE_USER",
                    "READ_USER",
                    "UPDATE_USER",
                ]
            });       

        roleId = response.body.data.id;

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should not create a role with same name', async () => {
        const response = await request(app)
            .post('/role')
            .set('x-access-token', token)
            .send({
                name: "TEST_ROLE",
                permission: [
                    "CREATE_USER",
                    "READ_USER",
                    "UPDATE_USER",
                ]
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('Role already exists');
    });

    it('should update a roles name', async () => {
        const response = await request(app)
            .put(`/role/${roleId}`)
            .set('x-access-token', token)
            .send({
                name: "TEST_ROLE_UPDATED"
            });

        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe('TEST_ROLE_UPDATED');
    });

    it('should delete a role', async () => {
        const response = await request(app)
            .delete(`/role/${roleId}`)
            .set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });
});