import { Request, Response } from "express";
import MessageHelper from "../../helpers/MessageHelper";
import { CommentService } from "./services";

export class CommentController {
    async addCommentToPost(req: Request, res: Response) {
        const { postId, userId, content } = req.body;
        const comment = await new CommentService().addCommentToPost(postId, userId, content);
        if (comment) {
            return MessageHelper(comment, false, res);
        }
        return MessageHelper("Something happened while adding comment", true, res);
    }

    async getCommentById(req: Request, res: Response) {
        const { id } = req.params;
        const comment = await new CommentService().getCommentById(Number(id));
        if (comment) {
            return MessageHelper(comment, false, res);
        }
        return MessageHelper("Comment not found", true, res);
    }

    async getCommentsByPostId(req: Request, res: Response) {
        const { id } = req.params;
        const comments = await new CommentService().getCommentsByPostId(Number(id));
        if (comments) {
            return MessageHelper(comments, false, res);
        }
        return MessageHelper("Comments not found", true, res);
    }

    async editComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await new CommentService().editComment(Number(id), content);
        if (comment) {
            return MessageHelper(comment, false, res);
        }
        return MessageHelper("Something happened while editing comment", true, res);
    }

    async removeCommentFromPost(req: Request, res: Response) {
        const { id } = req.params;
        const comment = await new CommentService().removeCommentFromPost(Number(id));
        if (comment) {
            return MessageHelper(comment, false, res);
        }
        return MessageHelper("Something happened while removing comment", true, res);
    }
}