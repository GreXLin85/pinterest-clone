import { Application } from 'express';
import checkPermissions from '../../helpers/CheckPermissions';
import { verifyToken } from '../../helpers/TokenHelper';
import { PostController } from './controller';

export class PostRoute {
    public routes(app: Application): void {
        app.route('/post/:id')
            .get(new PostController().getPost)
            .patch(verifyToken, checkPermissions(["UPDATE_POST"]), new PostController().updatePost)
            .delete(verifyToken, checkPermissions(["DELETE_POST"]), new PostController().deletePost);

        app.route('/posts')
            .get(new PostController().getPosts);

        app.route('/post')
            .post(verifyToken, checkPermissions(["CREATE_POST"]),new PostController().createPost)

        app.route('/post/search/:title')
            .get(new PostController().searchPosts)
    }
}