import { Application } from 'express';
import request from 'supertest';

import * as userHelpers from '../../helpers/users-helpers';
import * as serverHelpers from '../../helpers/server-helpers';

describe('GET /users ', () => {

    let app: Application;
    let idUser: string;

    beforeAll( async () => {
        app       = await serverHelpers.getApp();
        idUser    = userHelpers.mockIdUser();
    });

    it('should return a 200 status code when calling the "/users" route', function ( done ) {

      request( app )   
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then( (response) => {
          done();
        })
        .catch( err => done(err) )

    });

    it('should return a 200 status code when calling the "/users/:id" route', function ( done ) {

        request( app )   
          .get(`/api/v1/users/${ idUser }`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then( (response) => {
            done();
          })
          .catch( err => done(err) )
  
      });
  

});
  