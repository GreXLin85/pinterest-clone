import request from 'supertest';
import app from '../../server';
import { faker } from '@faker-js/faker';
import prisma from '../../interfaces/Prisma';
import { PostService } from './services';

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

    it('should create a new post', async () => {
        const response = await request(app)
            .post('/post')
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
            .get(`/post/${postId}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    it('should get all posts', async () => {
        const response = await request(app)
            .get('/posts');

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('id');
    })

    it('should search for a post', async () => {
        const response = await request(app)
            .get(`/post/search/TEST`);

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('id');
    })

    it('should update a post', async () => {
        const response = await request(app)
            .patch(`/post/${postId}`)
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
            .delete(`/post/${postId}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    afterAll(async () => {
        await prisma.$disconnect();
    })
    
});