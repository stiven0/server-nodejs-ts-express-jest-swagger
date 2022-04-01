import { Request, Response } from 'express';

import User from '../../../models/user';
import { handleError } from '../../../utils/handle-error';

/**
 * Get all users
 * @swagger 
 * /users:
 *   get:
 *    tags: 
 *     [users]
 *    summary: Get all users
 *    description: Get data from all users
 *    responses: 
 *      '200':
 *       description: return the users in a collection (can be empty)
 *       content:   
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/user'
 *      '500':
 *       description: "returns an unexpected error" 
 * 
 */
export const getAllUsers = async ( req: Request, res: Response ) => {

    try {

        const usersDB = await User.find();
        return res.status(200).json({
            ok: true,
            users: usersDB
        });
        
    } catch (error) {
        
        return handleError( {
            ok: false,
            status: 'Error',
            statusCode: 500,
            message:  error ? error : 'Ha ocurrido un error inesperado'
        }, res );
        
    }

}

/**
 * Get user by id
 * @swagger 
 * /users/{id}:
 *   get:
 *    tags: 
 *     [users]
 *    summary: Get user by id
 *    description: Get data from user by id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: ID of user to return
 *       required: true
 *       schema:
 *        type: string
 *    responses: 
 *      '200':
 *       description: return the user
 *       content:   
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/newUser'
 *      '404':
 *       description: user not found
 *       content: {}
 *      '500':
 *       description: returns an unexpected error 
 * 
 */
export const getUserById = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {

        const userDB = await User.findById(id);
        if ( userDB?._id ) {
                return res.status(200).json({ 
                    ok: true,
                    user: userDB
                });
        }

        return handleError( {
            ok: false,
            status: 'Error',
            statusCode: 404,
            message: 'El usuario solicitado no se ha encontrado'
        }, res );
        
    } catch (error) {
        
        return handleError( {
            ok: false,
            status: 'Error',
            statusCode: 500,
            message:  error ? error : 'Ha ocurrido un error inesperado'
        }, res );

    }
    
}