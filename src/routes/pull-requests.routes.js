import Express from 'express';
import getPullRequestData from '../controllers/pull-requests.controllers.js';

const router = Express.Router();

router.get('/:organization/:repository/open-pull-requests', getPullRequestData)

export default router;
