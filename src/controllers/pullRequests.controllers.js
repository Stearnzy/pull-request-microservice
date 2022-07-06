// Using a class could probably be better here, especially since I'm getting a `Rename this file to "getPullRequestdata"` lint warning.  My experience so far has been in Hapi.js, so I'm more used to this functional approach
import collectOpenPullRequestGeneralData from '../helpers/collectOpenPullRequestGeneralData.js';
import getPullRequest from '../services/getPullRequest.js';

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
