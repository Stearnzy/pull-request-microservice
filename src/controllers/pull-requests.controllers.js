import axios from 'axios';
import collectOpenPullRequestGeneralData from '../helpers/collectOpenPullRequestGeneralData.js';

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
      pullRequestData = await axios.get(`https://api.github.com/repos/${organization}/${repository}/pulls/${pullRequestNumber}`, {
        auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
      });
    } catch (e) {
      console.log('ERROR', e);
    }

    openPullRequests[i].commit_count = pullRequestData.data.commits;
  }

  res.send(openPullRequests);
}

export default getPullRequests;
