import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

const students = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];

router.get('/', (req: Request, res: Response) => {
    res.json(students)
})

export default router;