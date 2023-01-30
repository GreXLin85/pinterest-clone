import { Request, Response } from "express";
import MessageHelper from "../../helpers/MessageHelper";
import { CommentService } from "./services";

export class CommentController {
    private commentService = new CommentService()

    async addCommentToPost(req: Request, res: Response) {
        const { postId, userId, content } = req.body;
        const commentAdded = await this.commentService.addCommentToPost(postId, userId, content);
        if (commentAdded) {
            return MessageHelper(commentAdded, false, res);
        }
        return MessageHelper("Something happened while adding comment", true, res);
    }

    async getCommentById(req: Request, res: Response) {
        const { id } = req.params;
        const commentRead = await this.commentService.getCommentById(Number(id));
        if (commentRead) {
            return MessageHelper(commentRead, false, res);
        }
        return MessageHelper("Comment not found", true, res);
    }

    async getCommentsByPostId(req: Request, res: Response) {
        const { id } = req.params;
        const commentsRead = await this.commentService.getCommentsByPostId(Number(id));
        if (commentsRead) {
            return MessageHelper(commentsRead, false, res);
        }
        return MessageHelper("Comments not found", true, res);
    }

    async editComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
        const commentEdited = await this.commentService.editComment(Number(id), content);
        if (commentEdited) {
            return MessageHelper(commentEdited, false, res);
        }
        return MessageHelper("Something happened while editing comment", true, res);
    }

    async removeCommentFromPost(req: Request, res: Response) {
        const { id } = req.params;
        const commentRemoved = await this.commentService.removeCommentFromPost(Number(id));
        if (commentRemoved) {
            return MessageHelper(commentRemoved, false, res);
        }
        return MessageHelper("Something happened while removing comment", true, res);
    }
}