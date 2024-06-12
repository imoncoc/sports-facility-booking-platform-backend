import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import config from './app/config';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications
// app.use('/api/v1/students');

const getAController = (req: Request, res: Response) => {
  res.send('Hello Next level Developer!');
};
// applications
app.get('/', getAController);
app.use('/api', router);

app.use(globalErrorHandler);

// NOt Found
app.use(notFound);

export default app;
