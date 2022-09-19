import supertest from 'supertest';
import Joi from 'joi';

import app from '../src/app';
import { client } from '../src/config/database';
import * as user from './factories/userFactory';

describe('Testing login', () => {

  beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it('Should return status code 201 and token given right credentials', async () => {
    const createAccount = user.signupInfos();
    const preTest = await supertest(app).post('/signup').send(createAccount);
    expect(preTest.status).toBe(201);
    const returningSchema = Joi.object({ token: Joi.string().required() });
    const body = {
      email: createAccount.email,
      password: createAccount.password,
    }
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toBe(201);
    const validation = returningSchema.validate(result.body);
    expect(validation.error).toBeFalsy();
  });

  it('Should return status code 401 if wrong email is sent', async () => {
    const createAccount = user.signupInfos();
    const preTest = await supertest(app).post('/signup').send(createAccount);
    expect(preTest.status).toBe(201);
    const body = {
      email: 'babaloo@gmail.com',
      password: createAccount.password,
    }
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toBe(401);
  });

  it('Should return status code 401 if wrong password is sent', async () => {
    const createAccount = user.signupInfos();
    const preTest = await supertest(app).post('/signup').send(createAccount);
    expect(preTest.status).toBe(201);
    const body = {
      email: createAccount.email,
      password: 'wrongPassword',
    }
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toBe(401);
  });

  afterAll(async () => {
    await client.$disconnect();
  })

});
