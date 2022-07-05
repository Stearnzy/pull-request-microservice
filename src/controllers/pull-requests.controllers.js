import axios from 'axios';

const getPullRequests = async function (req, res) {
  const {
    organization,
    repository,
  } = req.params;

  let pageNumber = 1;

  const collectPullRequestData = async function ({
    org,
    repo,
    page,
    pullRequests,
  }) {
    const openPullRequestsRaw = await axios.get(`https://api.github.com/repos/${org}/${repo}/pulls?state=open&per_page=100&page=${page}`, {
      auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
    });

    const openPullRequestData = openPullRequestsRaw.data;

    if (openPullRequestData.length > 0) {
      const trimmedPRData = openPullRequestData.map(pullRequest => {
        return {
          id: pullRequest.id,
          number: pullRequest.number,
          title: pullRequest.title,
          author: pullRequest.user.login,
        };
      });

      pullRequests.push(...trimmedPRData);

      page += 1;

      await collectPullRequestData({ org, repo, page, pullRequests });
    }

    return pullRequests;
  };

  let trimmedPullRequests;
  try {
    trimmedPullRequests = await collectPullRequestData({
      org: organization,
      repo: repository,
      page: pageNumber,
      pullRequests: [],
    });

  } catch (err) {
    console.log('ERROR', err);
  }

  for (let i = 0; i < trimmedPullRequests.length; ++i) {
    const pullRequestNumber = trimmedPullRequests[i].number;

    let pullRequestData;
    try {
      pullRequestData = await axios.get(`https://api.github.com/repos/${organization}/${repository}/pulls/${pullRequestNumber}`, {
        auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
      });
    } catch (e) {
      console.log('ERROR', e);
    }

    trimmedPullRequests[i].commit_count = pullRequestData.data.commits;
  }

  res.send(trimmedPullRequests);
}

export default getPullRequests;
