import prisma from "../../interfaces/Prisma";


export class CommentService {
    async addCommentToPost(postId: number, authorId: number, content: string) {
        return await prisma.comment.create({
            data: {
                content,
                post: {
                    connect: {
                        id: postId,
                    }
                },
                author: {
                    connect: {
                        id: authorId,
                    }
                }
            },
        });
    }

    async getCommentById(id: number) {
        return await prisma.comment.findUnique({
            where: {
                id,
            },
        });
    }

    async getCommentsByPostId(postId: number) {
        return await prisma.post.findUnique({
            where: {
                id: postId,
            },
        }).comments();
    }


    async editComment(id: number, content: string) {
        return await prisma.comment.update({
            where: {
                id,
            },
            data: {
                content
            },
        });
    }

    async removeCommentFromPost(id: number) {
        return await prisma.comment.delete({
            where: {
                id,
            },
        });
    }
}
