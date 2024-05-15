import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './app/config';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
  //   res.send("Hello World!");
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});

export default app;
