import express from 'express';
import type { Request, Response } from 'express';
import User from '../models/User.js';
import * as userControllers from '../controllers/userControllers.js'


const router = express.Router();

//GET /api/users
router.get('/', userControllers.getAllUsers);

//POST /api/users
router.post('/', userControllers.createUser);

//DELETE /api/users
router.delete('/:id', userControllers.deleteUser);

export default router;

