import supertest from 'supertest';
import Joi from 'joi';

import app from '../src/app';
import * as user from './factories/userFactory';

describe('Testing sing-up', () => {

  it('Should return status code 201 and the created user', async () => {
    const returnSchema = Joi.object({
      id: Joi.number().integer().greater(0).required(),
      email: Joi.string().email().required(),
    });
    const body = user.signupInfos();
    const result = await supertest(app).post('/signup').send(body);
    const validation = returnSchema.validate(result.body);
    expect(result.status).toBe(201);
    expect(validation.error).toBeFalsy();
  });

  it('Should return status code 422 when password is different from confirmation', async () => {
    const body = user.signupInfos();
    body.confirmPassword = 'differentPassword';
    const result = await supertest(app).post('/signup').send(body);
    expect(result.status).toBe(422);
  });

  it('Should return status code 409 when email is in use', async () => {
    const body = user.signupInfos();
    const preTest = await supertest(app).post('/signup').send(body);
    expect(preTest.status).toBe(201);
    expect(preTest.body.email).toBe(body.email);
    const result = await supertest(app).post('/signup').send(body);
    expect(result.status).toBe(409);
  });

});
