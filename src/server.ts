import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import RouteLoader from './helpers/RouteLoader';
import Auth from './modules/auth';
const app = express();

app.use(json());
app.use(cors());

RouteLoader(app, [
  Auth
])

const SERVER_PORT = Number(process.env.PORT) || 4000;

app.listen(SERVER_PORT, () => {
  console.log('Server started on port ', SERVER_PORT);
});