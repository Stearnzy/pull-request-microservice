import Express from 'express';
import getPullRequestData from '../controllers/pullRequests.controllers.js';

const router = Express.Router();

// Using classes instead of functional programming could have been better for defining the controller for this route. Eg) `PullRequestController.getPullRequestData`
router.get('/:organization/:repository/open-pull-requests', getPullRequestData)

export default router;
