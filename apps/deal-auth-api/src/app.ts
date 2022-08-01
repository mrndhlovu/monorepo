import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import * as express from 'express';
import { errorService } from '@loxodonta/deal-apis/shared-utils';
import authRoutes from './routes';
import { AuthMiddleWare } from './middleware/auth';

const BASE_URL = '/api/auth';

const secure =
  process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development';

const app = express.default();

app.set('trust proxy', true);
app.use(AuthMiddleWare.credentials);
// app.use(cors(AuthService.getCorsOptions()))
app.use(cookieParser.default());
app.use(express.json());
app.use(cookieSession({ signed: false, secure }));
app.use(express.urlencoded({ extended: false }));
app.use(BASE_URL, authRoutes);
app.all('*', errorService.handleNotFoundError);
app.use(errorService.errorHandler);

export default app;
