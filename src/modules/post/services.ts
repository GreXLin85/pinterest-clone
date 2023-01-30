import { Prisma } from "@prisma/client";
import prisma from "../../interfaces/Prisma";

export class PostService {
    getPostById = async (id: number) => {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                comments: true,
                author: true
            }
        })

        return post;
    }

    searchPostsByTitle = async (title: string) => {
        const posts = await prisma.post.findMany({
            take: 10,
            where: {
                title: {
                    search: title
                }
            },
            include: {
                comments: true,
                author: true
            },
        })

        return posts;
    }

    getPosts = async (
        skip?: number,
        take?: number,
    ) => {
        take = Number(take);
        skip = Number(skip);

        if (!skip) {
            skip = 0;
        }

        if (!take) {
            take = 10;
        }

        if (take > 100) {
            take = 100;
        }

        const posts = await prisma.post.findMany({
            skip,
            take,
            include: {
                comments: true,
                author: true
            }
        })

        return posts;
    }

    createPost = async (data: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>) => {
        const post = await prisma.post.create({
            data
        })

        return post;
    }

    updatePost = async (id: number, data: Prisma.PostUpdateInput) => {
        const post = await prisma.post.update({
            where: {
                id
            },
            data
        })

        return post;
    }
    
    deletePost = async (id: number) => {
        const post = await prisma.post.delete({
            where: {
                id
            }
        })

        return post;
    }
}