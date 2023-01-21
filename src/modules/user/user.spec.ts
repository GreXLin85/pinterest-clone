import request from 'supertest';
import app, { appListener } from '../../server';
import { faker } from '@faker-js/faker';


describe('User', () => {
    const userUsername = faker.internet.userName();
    const userNewUsername = faker.internet.userName();
    const userPassword = faker.internet.password();
    const userNewPassword = faker.internet.password();
    let userId: number;

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/user')
            .send({
                username: userUsername,
                password: userPassword,
                roleId: 1,
            });

        userId = response.body.data.id;

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should not create a new user with same username', async () => {
        const response = await request(app)
            .post('/user')
            .send({
                username: userUsername,
                password: userPassword,
                roleId: 1,
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('User already exists');
    });

    it('should get a user', async () => {
        const response = await request(app).get('/user/' + userId);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should not get a user', async () => {
        const response = await request(app).get('/user/2000');

        expect(response.status).toBe(400);
        expect(response.body.data).not.toHaveProperty('id');
    });

    it('should get all users', async () => {
        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('id');
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put('/user/' + userId)
            .send({
                username: userNewUsername,
            });

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe(userNewUsername);
    });

    it('should not update a user', async () => {
        const response = await request(app)
            .put('/user/2000')
            .send({
                username: 'User1',
                password: 'user1',
                roleId: 1,
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('User not found');
    });

    it('should update a user password', async () => {
        const response = await request(app)
            .patch('/user/' + userId)
            .send({
                oldPassword: userPassword,
                newPassword: userNewPassword,
            });

        expect(response.status).toBe(200);
        expect(response.body.data.password).toBe(userNewPassword);
    });

    it('should not update a user password', async () => {
        const response = await request(app)
            .patch('/user/' + userId)
            .send({
                oldPassword: userPassword,
                newPassword: userNewPassword,
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('Incorrect password');
    });

    it('should delete a user', async () => {
        const response = await request(app).delete('/user/' + userId);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should not delete a user', async () => {
        const response = await request(app).delete('/user/2000');

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('User not found');
    });

    afterAll(async () => {
        appListener.close();
    });
});