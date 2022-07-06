import Express from 'express';
import getPullRequestData from '../controllers/pullRequests.controllers.js';

const router = Express.Router();

router.get('/:organization/:repository/open-pull-requests', getPullRequestData)

export default router;
