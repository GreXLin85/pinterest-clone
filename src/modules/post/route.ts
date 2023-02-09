import { Application } from 'express';
import isAuthorized from '../../helpers/isAuthorized';
import { isAuthenticated } from '../../helpers/TokenHelper';
import { PostController } from './controller';

export class PostRoute {
    public routes(app: Application): void {
        app.route('/post/:id')
            .get(new PostController().getPost)
            .put(isAuthenticated, isAuthorized(["UPDATE_POST"]), new PostController().updatePost)
            .delete(isAuthenticated, isAuthorized(["DELETE_POST"]), new PostController().deletePost);

        app.route('/posts')
            .get(new PostController().getPosts);

        app.route('/post')
            .post(isAuthenticated, isAuthorized(["CREATE_POST"]),new PostController().createPost)

        app.route('/post/search/:title')
            .get(new PostController().searchPosts)
    }
}