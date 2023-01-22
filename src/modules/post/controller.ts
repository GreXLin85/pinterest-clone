import { Request, Response } from "express";
import MessageHelper from "../../helpers/MessageHelper";
import { PostService } from "./services";

export class PostController {
    getPost = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const post = await PostService.getPostById(Number(id));

            if (!post) {
                return MessageHelper("Post not found", true, res);
            }

            return MessageHelper(post, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getPosts = async (req: Request, res: Response) => {
        try {
            // Request query params are always strings by default so we need to cast them to numbers
            let { take, skip } = req.query as unknown as { take: number, skip: number };

            const posts = await PostService.getPosts(skip, take);

            return MessageHelper(posts, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    searchPosts = async (req: Request, res: Response) => {
        try {
            const { title } = req.query as { title: string };

            const posts = await PostService.searchPostsByTitle(title);

            return MessageHelper(posts, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    createPost = async (req: Request, res: Response) => {
        try {
            const { title, content, image, authorId } = req.body as { title: string, content: string, image: string, authorId: number };
            const post = await PostService.createPost({
                title, content, authorId, image
            });

            return MessageHelper(post, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    updatePost = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const { title, content } = req.body as { title: string, content: string };
            const post = await PostService.updatePost(Number(id), { title, content });

            return MessageHelper(post, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    deletePost = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const post = await PostService.deletePost(Number(id));

            return MessageHelper(post, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }
}
