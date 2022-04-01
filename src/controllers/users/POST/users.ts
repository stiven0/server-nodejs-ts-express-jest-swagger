import { Request, Response } from 'express';

import User from '../../../models/user';
import { handleError } from '../../../utils/handle-error';

/**
 * save new user
 * @swagger
 * /users:
 *   post:
 *    tags:
 *     [users]
 *    summary: Save new user
 *    description: New user being added to the database
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user'
 *     required: true
 *    responses:
 *     '400':
 *      description: Invalid input
 *      content: {}
 *     '500':
 *       description: returns an unexpected error
 * 
 */

export const saveUser = async ( req: Request, res: Response ) => {

    const { name, email } = req.body;

    const user = new User({
        name,
        email
    });

    try {

        const userDB = await user.save();
        if ( userDB ) {
            res.status(201).json({
                ok: true,
                message: 'Te has registrado satisfactoriamente'
            });

        } else {
            return handleError( {
                ok: false,
                status: 'Error',
                statusCode: 400,
                message: 'No fue posible completar el registro, por favor inténtalo nuevamente'
              }, res );
        }
        
    } catch (error: any) {

        if ( error.errors ) {
            const errors = error.errors;
      
            if ( errors.name ) {
      
                return handleError( {
                  ok: false,
                  status: 'Error',
                  statusCode: 400,
                  message: {
                    key: 'name',
                    error: error.errors.name.properties.message
                  }
                }, res );
      
            } else if ( errors.email ) {

  
                return handleError( {
                  ok: false,
                  status: 'Error',
                  statusCode: 400,
                  message: {
                    key: 'email',
                    error: error.errors.email.properties.message
                  }
                }, res );
        
            }
            
        }

        return handleError( {
            ok: false,
            status: 'Error',
            statusCode: 500,
            message:  error ? error : 'Ha ocurrido un error inesperado'
        }, res );   

    }

}