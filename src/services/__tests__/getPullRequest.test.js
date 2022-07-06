import getPullRequest from '../getPullRequest.js';
import axios from 'axios';
import pullRequestDetails116 from '../../fixtures/pullRequestDetails116.json';

jest.mock('axios');

describe('getPullRequest', () => {
  it('returns raw data for one pull request', async () => {
    axios.get.mockResolvedValue(pullRequestDetails116);

    const res = await getPullRequest({
      organization: 'turingschool-examples',
      repository: 'monster_shop_2005',
      pullRequestNumber: 116,
    });

    expect(res.data).toBeDefined();
    expect(res.data.url).toBeDefined();
    expect(res.data.id).toBeDefined();
    expect(res.data.user.login).toBeDefined();
    expect(res.data.commits).toBeDefined();

    expect(res.data.commits).toEqual(300);
  })
});
