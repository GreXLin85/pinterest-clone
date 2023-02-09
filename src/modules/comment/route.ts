import { Application } from 'express';
import isAuthorized from '../../helpers/isAuthorized';
import { isAuthenticated } from '../../helpers/TokenHelper';
import { CommentController } from './controller';

export class CommentRoute {
    public routes(app: Application): void {
        app.route('/comment')
            .post(isAuthenticated, isAuthorized(["CREATE_COMMENT"]), new CommentController().addCommentToPost);

        app.route('/comment/:id')
            .get(isAuthenticated, isAuthorized(["READ_COMMENT"]), new CommentController().getCommentById)
            .put(isAuthenticated, isAuthorized(["UPDATE_COMMENT"]), new CommentController().editComment)
            .delete(isAuthenticated, isAuthorized(["DELETE_POST"]), new CommentController().removeCommentFromPost);

        //This id is postId
        app.route('/comments/:id')
            .get(new CommentController().getCommentsByPostId);
    }
}