import request from 'supertest';
import app from '../../server';
import { faker } from '@faker-js/faker';
import { UserService } from '../user/services';


describe('Auth', () => {
    const userUsername = faker.internet.userName();
    const userPassword = faker.internet.password();
    const userService = new UserService()


    it('should create a new user', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: userUsername,
                password: userPassword,
            });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('token');
    });

    it('should not create a new user with same username', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: userUsername,
                password: userPassword,
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('User already exists');
    });

    it('should login a user', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: userUsername,
                password: userPassword,
            });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('token');
    });

    it('should not login a user', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: userUsername,
                password: `${userPassword}1`,
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe('Password is incorrect');
    });

    afterAll(async () => {
        const userId = (await userService.getUserByUsername(userUsername))?.id as number
        await userService.deleteUser(userId)
    })
});