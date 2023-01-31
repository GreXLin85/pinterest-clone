import request from 'supertest';
import app from '../../server';
import { faker } from '@faker-js/faker';
import prisma from '../../interfaces/Prisma';
import { sign } from '../../helpers/JWTHelper';

// test;
/*
    creating post
    getting post
    getting all posts
    updating post
    deleting post
*/

describe('Post', () => {
    let postId: number;
    let token: string;
    beforeAll(async () => {
        token = sign(1);
    });
    
    it('should create a new post', async () => {
        const response = await request(app)
            .post('/post')
            .set('x-access-token', token)
            .send({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                image: faker.image.imageUrl(),
                authorId: 1,
            });

        postId = response.body.data.id;

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should get a post', async () => {
        const response = await request(app)
            .get(`/post/${postId}`)
            .set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    it('should get all posts', async () => {
        const response = await request(app)
            .get('/posts')
            .set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('id');
    })

    it('should search for a post', async () => {
        const response = await request(app)
            .get(`/post/search/TEST`)
            .set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('id');
    })

    it('should update a post', async () => {
        const response = await request(app)
            .patch(`/post/${postId}`)
            .set('x-access-token', token)
            .send({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                image: faker.image.imageUrl(),
                authorId: 1,
            });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    it('should delete a post', async () => {
        const response = await request(app)
            .delete(`/post/${postId}`)
            .set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    afterAll(async () => {
        await prisma.$disconnect();
    })
    
});