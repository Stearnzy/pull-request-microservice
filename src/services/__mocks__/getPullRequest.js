import pullRequestDetails116 from '../../fixtures/pullRequestDetails116.json';
import pullRequestDetails113 from '../../fixtures/pullRequestDetails113.json';
import pullRequestDetails122 from '../../fixtures/pullRequestDetails122.json';

const getPullRequest = async ({
  organization,
  repository,
  pullRequestNumber,
}) => {
  if (pullRequestNumber === 116) {
    return pullRequestDetails116;
  } else if (pullRequestNumber === 122) {
    return pullRequestDetails122;
  } else if (pullRequestNumber === 113) {
    return pullRequestDetails113;
  }
}

export default getPullRequest;