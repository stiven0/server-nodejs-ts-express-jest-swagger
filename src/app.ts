import express,{ Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger';
import { urlencoded, json } from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import compression from 'compression';

import rateLimiterGlobal from './middlewares/rate-limit-global';
import { CONFIG } from './utils/config';

const app: Application = express();

// import routes
import userRoutes from './routes/user';

// middlewares
app.use(helmet());
app.use(compression());
app.use(urlencoded({ extended : true }));
app.use(json());
app.use(mongoSanitize());
app.use(hpp());

if ( CONFIG.ENVIRONMENT === 'development' ) app.use( ( logger('dev') as any) );

// CORS
app.use( (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// routes
app.use( rateLimiterGlobal );
app.use('/api/v1', userRoutes);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;