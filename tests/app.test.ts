import supertest from 'supertest';

import app from '../src/app';

describe('Testing route \'/\'', () => {
  it('Should return a string when a GET request is made', async () => {
    const result = await supertest(app).get('/').send();
    expect(result.text).toBe('Its working');
  });
});
