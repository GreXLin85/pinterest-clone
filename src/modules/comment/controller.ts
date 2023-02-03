import { Request, Response } from "express";
import isUserOwn from "../../helpers/isUserOwn";
import MessageHelper from "../../helpers/MessageHelper";
import { PostService } from "../post/services";
import { UserService } from "../user/services";
import { CommentService } from "./services";

export class CommentController {
    private commentService: CommentService;
    private userService: UserService;
    private postService: PostService;

    constructor() {
        this.commentService = new CommentService();
        this.userService = new UserService();
        this.postService = new PostService();
    }

    addCommentToPost = async (req: Request, res: Response) => {
        const { postId, userId, content } = req.body;

        const post = await this.postService.getPostById(Number(postId));

        if (!post) {
            return MessageHelper("Post not found", true, res);
        }

        const user = await this.userService.getUserById(Number(userId));

        if (!user) {
            return MessageHelper("User not found", true, res);
        }

        if (!isUserOwn(req.user.id, req.user.role.name, Number(userId))) {
            return MessageHelper("You don't have permission to access this resource", true, res);
        }

        const commentAdded = await this.commentService.addCommentToPost(Number(postId), Number(userId), content);

        if (commentAdded) {
            return MessageHelper(commentAdded, false, res);
        }
        return MessageHelper("Something happened while adding comment", true, res);
    }

    getCommentById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentRead = await this.commentService.getCommentById(Number(id));
        if (commentRead) {
            return MessageHelper(commentRead, false, res);
        }
        return MessageHelper("Comment not found", true, res);
    }

    getCommentsByPostId = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentsRead = await this.commentService.getCommentsByPostId(Number(id));
        if (commentsRead) {
            return MessageHelper(commentsRead, false, res);
        }
        return MessageHelper("Comments not found", true, res);
    }

    editComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await this.commentService.getCommentById(Number(id));

        if (!comment) {
            return MessageHelper("Comment not found", true, res);
        }

        if (!isUserOwn(req.user.id, req.user.role.name, comment.authorId)) {
            return MessageHelper("You are not allowed to edit this comment", true, res);
        }

        const commentEdited = await this.commentService.editComment(Number(id), content);
        if (commentEdited) {
            return MessageHelper(commentEdited, false, res);
        }
        return MessageHelper("Something happened while editing comment", true, res);
    }

    removeCommentFromPost = async (req: Request, res: Response) => {
        const { id } = req.params;

        const comment = await this.commentService.getCommentById(Number(id));

        if (!comment) {
            return MessageHelper("Comment not found", true, res);
        }

        if (!isUserOwn(req.user.id, req.user.role.name, comment.authorId)) {
            return MessageHelper("You are not allowed to remove this comment", true, res);
        }

        const commentRemoved = await this.commentService.removeCommentFromPost(Number(id));
        if (commentRemoved) {
            return MessageHelper(commentRemoved, false, res);
        }
        return MessageHelper("Something happened while removing comment", true, res);
    }
}