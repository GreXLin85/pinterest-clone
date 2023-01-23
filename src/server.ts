import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import RouteLoader from './helpers/RouteLoader';
import { AuthRoute } from './modules/auth/route';
import { UserRoute } from './modules/user/route';
import { RoleRoute } from './modules/role/route';
import { PostRoute } from './modules/post/route';
import { CommentRoute } from './modules/comment/route';
const app = express();

app.use(json());
app.use(cors());

RouteLoader(app, [
  new AuthRoute(),
  new UserRoute(),
  new RoleRoute(),
  new PostRoute(),
  new CommentRoute()
])

const SERVER_PORT = Number(process.env.PORT) || 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(SERVER_PORT, () => {
    console.log('Server started on port ', SERVER_PORT);
  });
}

export default app;