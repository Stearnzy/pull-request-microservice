import axios from 'axios';
import constants from '../constants.js';

const {
  baseUrl,
  pullRequestState,
  resultsPerPage,
} = constants;

const getOpenPullRequests = async ({
  organization,
  repository,
  pageNumber,
}) => {
  return axios.get(`${baseUrl}/repos/${organization}/${repository}/pulls?state=${pullRequestState}&per_page=${resultsPerPage}&page=${pageNumber}`, {
    auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
  });
};

const getPullRequest = async ({
  organization,
  repository,
  pullRequestNumber,
}) => {
  return axios.get(`${baseUrl}/repos/${organization}/${repository}/pulls/${pullRequestNumber}`, {
    auth: { username: process.env.GITHUB_USERNAME, token: process.env.GITHUB_ACCESS_TOKEN }
  });
}

export { getOpenPullRequests, getPullRequest };
