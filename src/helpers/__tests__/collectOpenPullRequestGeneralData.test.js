import collectOpenPullRequestGeneralData from '../collectOpenPullRequestGeneralData';

jest.mock('../../services/getOpenPullRequests.js');

describe('collectOpenPullRequestGeneralData', () => {
  // This test calls the mock getOpenPullRequests function from /services/__mocks__, which pulls on fixture files mimicing a GitHub response of one pull request per page`
  it('recursively collects all pull requests', async () => {
    const res = await collectOpenPullRequestGeneralData({
      organization: 'turingschool-examples',
      repository: 'monster_shop_2005',
      accumulator: [],
    });

    expect(res.length).toEqual(3);
  });

  it('trims out unneeded data', async () => {
    const res = await collectOpenPullRequestGeneralData({
      organization: 'turingschool-examples',
      repository: 'monster_shop_2005',
      accumulator: [],
    });

    expect(res[0].id).toBeDefined();
    expect(res[0].number).toBeDefined();
    expect(res[0].title).toBeDefined();
    expect(res[0].author).toBeDefined();

    expect(res[0].state).not.toBeDefined();
    expect(res[0].url).not.toBeDefined();
    expect(res[0].locked).not.toBeDefined();
  });
});