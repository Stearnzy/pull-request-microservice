import axios from 'axios';

const getOpenPullRequests = async ({
  organization,
  repository,
  pageNumber,
}) => {
  return axios.get(`https://api.github.com/repos/${organization}/${repository}/pulls?state=open&per_page=100&page=${pageNumber}`, {
    auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
  });
};

const getPullRequest = async ({
  organization,
  repository,
  pullRequestNumber,
}) => {
  return axios.get(`https://api.github.com/repos/${organization}/${repository}/pulls/${pullRequestNumber}`, {
    auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
  });
}

export { getOpenPullRequests, getPullRequest };
