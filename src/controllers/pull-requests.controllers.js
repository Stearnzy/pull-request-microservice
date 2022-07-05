import collectOpenPullRequestGeneralData from '../helpers/collectOpenPullRequestGeneralData.js';
import { getPullRequest } from '../services/githubService.js';

const getPullRequestData = async (req, res) => {
  try {
    const {
      organization,
      repository,
    } = req.params;

    let openPullRequests;

    openPullRequests = await collectOpenPullRequestGeneralData({
      organization,
      repository,
      accumulator: [],
    });

    for (let i = 0; i < openPullRequests.length; ++i) {
      const pullRequestNumber = openPullRequests[i].number;

      const pullRequestData = await getPullRequest({ organization, repository, pullRequestNumber });

      openPullRequests[i].commit_count = pullRequestData.data.commits;
    }

    res.send(openPullRequests);
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong!'});
  }
}

export default getPullRequestData;
