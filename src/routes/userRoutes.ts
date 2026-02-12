import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

const users = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" },
];

router.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

export default router;

