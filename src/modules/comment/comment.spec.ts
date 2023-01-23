import request from 'supertest';
import app from '../../server';
import { faker } from '@faker-js/faker';
import prisma from '../../interfaces/Prisma';


describe('Comment', () => {
    let postId: number;
    let commentId: number;

    beforeAll(async () => {
        const post = await prisma.post.create({
            data: {
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                image: faker.image.imageUrl(),
                author: {
                    connect: {
                        id: 1
                    }
                }
            }
        });

        postId = post.id;
    })

    afterAll(async () => {
        await prisma.post.delete({
            where: {
                id: postId
            }
        })

        await prisma.$disconnect();
    })

    it('should add comment to post', async () => {
        const response = await request(app)
            .post('/comment')
            .send({
                postId,
                userId: 1,
                content: faker.lorem.sentence()
            })
        commentId = response.body.data.id;
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    it('should get comment by id', async () => {
        const response = await request(app)
            .get(`/comment/${commentId}`)

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    it('should get comments by post id', async () => {
        const response = await request(app)
            .get(`/comments/${postId}`)

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
    })

    it('should edit comment', async () => {
        const response = await request(app)
            .put(`/comment/${commentId}`)
            .send({
                content: faker.lorem.sentence()
            })

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })

    it('should remove comment from post', async () => {
        const response = await request(app)
            .delete(`/comment/${commentId}`)

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    })
})

