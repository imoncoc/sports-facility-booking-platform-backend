import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import config from './app/config';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications
// app.use('/api/v1/students');

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
