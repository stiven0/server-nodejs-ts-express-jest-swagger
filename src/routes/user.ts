import { Router } from 'express';

// constrollers
import * as getUserMethods from '../controllers/users/GET/users';
import * as postUserMethods from '../controllers/users/POST/users';

const router = Router();

// routes
router.get('/users',     getUserMethods.getAllUsers);
router.get('/users/:id', getUserMethods.getUserById);

router.post('/users',    postUserMethods.saveUser);

export default router;