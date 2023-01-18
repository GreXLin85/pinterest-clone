import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
const app = express();

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const SERVER_PORT = Number(process.env.PORT) || 4000;

app.listen(SERVER_PORT, () => {
  console.log('Server started on port ', SERVER_PORT);
});