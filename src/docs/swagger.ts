import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.1',
    info: {
        title: 'Documentación de la API',
        version: '1.0.0'
    },
    servers: [
        { url: 'http://localhost:3000/api/v1' }
    ],
    components: {
        schemas: {
            user: {
                type: 'object',
                properties: {
                    _id: { 
                        type: 'ObjectId',
                        format: 'string'
                    },
                    name: {
                        type: 'string',
                    },
                    email: { 
                        type: 'string'
                    },
                    role: {
                        type: 'string'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time'
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time'
                    }
                }
            },
            newUser: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/controllers/*/*/*.ts']
}

export default swaggerJSDoc( swaggerOptions );