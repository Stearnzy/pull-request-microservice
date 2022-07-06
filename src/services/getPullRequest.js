import axios from 'axios';
import constants from '../constants.js';

const {
  baseUrl,
  pullRequestState,
  resultsPerPage,
} = constants;

const getPullRequest = async ({
  organization,
  repository,
  pullRequestNumber,
}) => {
  return axios.get(`${baseUrl}/repos/${organization}/${repository}/pulls/${pullRequestNumber}`, {
    headers: { 'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`}
  });
}

export default getPullRequest;
