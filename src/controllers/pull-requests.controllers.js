import collectOpenPullRequestGeneralData from '../helpers/collectOpenPullRequestGeneralData.js';
import { getPullRequest } from '../services/githubService.js';

const getPullRequestData = async (req, res) => {
  try {
    const {
      organization,
      repository,
    } = req.params;

    let openPullRequests;

    try {
      openPullRequests = await collectOpenPullRequestGeneralData({
        organization,
        repository,
        accumulator: [],
      });
    } catch (err) {
      console.log('ERROR', err);
    }

    for (let i = 0; i < openPullRequests.length; ++i) {
      const pullRequestNumber = openPullRequests[i].number;

      let pullRequestData;
      try {
        pullRequestData = await getPullRequest({ organization, repository, pullRequestNumber });
      } catch (err) {
        console.log('ERROR', err);
      }

      openPullRequests[i].commit_count = pullRequestData.data.commits;
    }

    res.send(openPullRequests);
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong!'});
  }
}

export default getPullRequestData;
