import rateLimit, { RateLimit } from 'express-rate-limit';
import { Request, Response } from 'express';

import { handleError } from '../utils/handle-error';

const rateLimiterGlobal: RateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 400,
    statusCode: 429,
    handler: ( req: Request, res: Response ) => {
        return handleError( {
            ok: false,
            status: 'Error',
            statusCode: 429,
            message: 'Has realizado demasiadas solicitudes, debes esperar un momento'
        }, res);
    }
});

export default rateLimiterGlobal;