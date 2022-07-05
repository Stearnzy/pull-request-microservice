import { getOpenPullRequests } from '../services/githubService.js';

const collectOpenPullRequestGeneralData = async ({
  organization,
  repository,
  pageNumber = 1,
  accumulator,
}) => {
  const openPullRequestsRaw = await getOpenPullRequests({ organization, repository, pageNumber });

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
