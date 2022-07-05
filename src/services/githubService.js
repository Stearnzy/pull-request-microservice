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
  // pullRequestState is set to 'open' so that the data returned is explicit
  return axios.get(`${baseUrl}/repos/${organization}/${repository}/pulls?state=${pullRequestState}&per_page=${resultsPerPage}&page=${pageNumber}`, {
    headers: { 'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`}
  });
};

const getPullRequest = async ({
  organization,
  repository,
  pullRequestNumber,
}) => {
  return axios.get(`${baseUrl}/repos/${organization}/${repository}/pulls/${pullRequestNumber}`, {
    headers: { 'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`}
  });
}

export { getOpenPullRequests, getPullRequest };
