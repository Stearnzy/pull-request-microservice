import pullRequestPage1 from '../../fixtures/pullRequestPage1.json';
import pullRequestPage2 from '../../fixtures/pullRequestPage2.json';
import pullRequestPage3 from '../../fixtures/pullRequestPage3.json';

const getOpenPullRequests = async ({
  organization,
  repository,
  pageNumber,
}) => {
  if (pageNumber === 1) {
    return pullRequestPage1;
  } else if (pageNumber === 2) {
    return pullRequestPage2;
  } else if (pageNumber === 3) {
    return pullRequestPage3;
  } else {
    return {
      data: [],
    };
  }
};

export default getOpenPullRequests;
