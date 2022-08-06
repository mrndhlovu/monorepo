import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';

import { paymentRoutes } from './routes';
import { errorService } from '@loxodonta/deal-apis/shared-utils';

const secure =
  process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development';

const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json());
app.use(cookieSession({ signed: false, secure }));
app.use(express.urlencoded({ extended: false }));
app.use('/api/payments', paymentRoutes);

app.all('*', errorService.handleNotFoundError);
app.use(errorService.errorHandler);

export default app;
