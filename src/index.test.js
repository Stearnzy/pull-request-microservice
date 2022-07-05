import Supertest from 'supertest';
import app from './index';

const request = Supertest(app);

it('calls the root endpoint successfully', async () => {
  const res = await request.get('/');

  expect(res.status).toBeGreaterThanOrEqual(200);
  expect(res.status).toBeLessThan(300);
  expect(res.text).toBe('Welcome to the GitHub pull request microservice!')
});

it('will return an error if the endpoint does not exist', async () => {
  const res = await request.get('/api/turkey');

  expect(res.status).toBeGreaterThanOrEqual(400);
  expect(res.status).toBeLessThan(500);
  expect(res.body.error).toBe('Route not found');
})
