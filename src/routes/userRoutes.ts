import express from 'express';
import type { Request, Response } from 'express';
import User from '../models/User.js';


const router = express.Router();

//GET /api/users
router.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

//POST /api/users
router.post('/', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

//DELETE /api/users
router.delete('/:id' ,async (req : Request, res : Response) => {
  let id = Number(req.params.id)
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({error : "pas de user ayant cet ID"});
  await user.destroy();
  res.json({message: `User ${req.params.id} a été supprimé`});
})

export default router;
