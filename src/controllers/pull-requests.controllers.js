import collectOpenPullRequestGeneralData from '../helpers/collectOpenPullRequestGeneralData.js';
import { getPullRequest } from '../services/githubService.js';

const getPullRequests = async function (req, res) {
  const {
    organization,
    repository,
  } = req.params;

  let pageNumber = 1;

  let openPullRequests;
  try {
    openPullRequests = await collectOpenPullRequestGeneralData({
      organization,
      repository,
      pageNumber,
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
    } catch (e) {
      console.log('ERROR', e);
    }

    openPullRequests[i].commit_count = pullRequestData.data.commits;
  }

  res.send(openPullRequests);
}

export default getPullRequests;
