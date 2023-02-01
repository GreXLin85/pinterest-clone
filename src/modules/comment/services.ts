import prisma from "../../interfaces/Prisma";

export class CommentService {
    addCommentToPost = async (postId: number, authorId: number, content: string) => {
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

    getCommentById = async (id: number) => {
        return await prisma.comment.findUnique({
            where: {
                id,
            },
        });
    }

    getCommentsByPostId = async (postId: number) => {
        return await prisma.post.findUnique({
            where: {
                id: postId,
            },
        }).comments();
    }


    editComment = async (id: number, content: string) => {
        return await prisma.comment.update({
            where: {
                id,
            },
            data: {
                content
            },
        });
    }

    removeCommentFromPost = async (id: number) => {
        return await prisma.comment.delete({
            where: {
                id,
            },
        });
    }
}
