import getPullRequest from './getPullRequest.js';
import axios from 'axios';
import pullRequestDetails from '../fixtures/pullRequestDetails.json';

jest.mock('axios');

describe('getPullRequest', () => {
  it('returns raw data for one pull request', async () => {
    axios.get.mockResolvedValue(pullRequestDetails);

    const res = await getPullRequest({
      organization: 'turingschool-examples',
      repository: 'monster_shop_2005',
      pullRequestNumber: 116,
    });

    expect(res.url).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.user.login).toBeDefined();
    expect(res.commits).toBeDefined();

    expect(res.commits).toEqual(300);
  })
});
