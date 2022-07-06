import getOpenPullRequests from '../getOpenPullRequests.js';
import axios from 'axios';
import fourPullRequests from '../../fixtures/fourPullRequests.json';

jest.mock('axios');

describe('getOpenPullRequests', () => {
  it('returns raw data of repository open pull requests', async () => {
    axios.get.mockResolvedValue(fourPullRequests);

    const res = await getOpenPullRequests({
      organization: 'turingschool-examples',
      repository: 'monster_shop_2005',
      pageNumber: 1,
    });

    expect(res.length).toEqual(4);
    expect(res[0].id).toBeDefined();
    expect(res[0].user.login).toBeDefined();
    expect(res[0].number).toBeDefined();
    expect(res[0].title).toBeDefined();
    
    expect(res[0].id).toEqual(516418880);
    expect(res[0].user.login).toEqual('GarrettCottrell');
    expect(res[0].number).toEqual(122);
    expect(res[0].title).toEqual('Refactorx2 routes');
  })
});
