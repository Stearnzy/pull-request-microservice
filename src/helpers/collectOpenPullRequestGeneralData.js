import axios from 'axios';

const collectOpenPullRequestGeneralData = async ({
  organization,
  repository,
  pageNumber,
  accumulator,
}) => {
  const openPullRequestsRaw = await axios.get(`https://api.github.com/repos/${organization}/${repository}/pulls?state=open&per_page=100&page=${pageNumber}`, {
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

    accumulator.push(...trimmedPRData);

    pageNumber += 1;

    await collectOpenPullRequestGeneralData({ organization, repository, pageNumber, accumulator });
  }

  return accumulator;
};

export default collectOpenPullRequestGeneralData;
