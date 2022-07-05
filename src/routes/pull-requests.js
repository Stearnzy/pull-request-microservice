import Express from 'express';
import getPullRequests from '../controllers/pull-requests.controllers.js';

const router = Express.Router();

router.get('/:organization/:repository/open-pull-requests', getPullRequests)

export default router;
