import { Application } from 'express';
import { CommentController } from './controller';

export class CommentRoute {
    public routes(app: Application): void {
        app.route('/comment')
            .post(new CommentController().addCommentToPost);

        app.route('/comment/:id')
            .get(new CommentController().getCommentById)
            .put(new CommentController().editComment)
            .delete(new CommentController().removeCommentFromPost);

        //This id is postId
        app.route('/comments/:id')
            .get(new CommentController().getCommentsByPostId);
    }
}