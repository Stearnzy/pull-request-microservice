import Supertest from 'supertest';
import app from './index';

const request = Supertest(app);

jest.mock('./helpers/collectOpenPullRequestGeneralData');
jest.mock('./services/getPullRequest');

describe('endpoint calls', () => {
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
  });

  // This test is one I felt would be appropriate to test for to verify that the mocks I added are working correctly. `turingschool-examples/flashcards-starter` is a real repository currently with 46 open pull requests
  it('verifies tests rely on mocked data', async () => {
    const res = await request.get('/api/github/turingschool-examples/flashcards-starter/open-pull-requests');

    expect(res.status).toBeGreaterThanOrEqual(500);
  })

  // Main integration test
  it('successfully retrieves pull request data', async () => {
    const res = await request.get('/api/github/turingschool-examples/monster_shop_2005/open-pull-requests');

    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(3);

    expect(res.body[0].id).toBeDefined();
    expect(res.body[0].number).toBeDefined();
    expect(res.body[0].title).toBeDefined();
    expect(res.body[0].author).toBeDefined();
    expect(res.body[0].commit_count).toBeDefined();

    expect(res.body[0].id).toBe(516418880);
    expect(res.body[0].number).toBe(122);
    expect(res.body[0].title).toBe('Refactorx2 routes');
    expect(res.body[0].author).toBe('GarrettCottrell');
    expect(res.body[0].commit_count).toBe(269);
  })
});
