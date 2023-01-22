import { Application } from 'express';
import { PostController } from './controller';

export class PostRoute {
    public routes(app: Application): void {
        app.route('/post/:id')
            .get(new PostController().getPost)
            .patch(new PostController().updatePost)
            .delete(new PostController().deletePost);

        app.route('/posts')
            .get(new PostController().getPosts);

        app.route('/post')
            .post(new PostController().createPost)

        app.route('/post/search/:title')
            .get(new PostController().searchPosts)
    }
}