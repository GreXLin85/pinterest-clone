import { Application } from 'express';
import checkPermissions from '../../helpers/CheckPermissions';
import { verifyToken } from '../../helpers/TokenHelper';
import { CommentController } from './controller';

export class CommentRoute {
    public routes(app: Application): void {
        app.route('/comment')
            .post(verifyToken, checkPermissions(["CREATE_COMMENT"]), new CommentController().addCommentToPost);

        app.route('/comment/:id')
            .get(verifyToken, checkPermissions(["READ_COMMENT"]), new CommentController().getCommentById)
            .put(verifyToken, checkPermissions(["UPDATE_COMMENT"]), new CommentController().editComment)
            .delete(verifyToken, checkPermissions(["DELETE_POST"]), new CommentController().removeCommentFromPost);

        //This id is postId
        app.route('/comments/:id')
            .get(new CommentController().getCommentsByPostId);
    }
}