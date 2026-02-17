import express from 'express';
import type { Request, Response } from 'express';
import User from '../models/User.js';
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userServices.js';



const router = express.Router();

//GET /api/users
router.get('/', async (req: Request, res: Response) => {
  try {
    //Service finAllUSers
    const users = await findAllUsers();
    //Retourner status OK réponse json
    return res.status(200).json(users);
  }
  catch (error) {
    //affiche l'erreur
    console.error('Erreur :', error);
    //retourne réponse http avec code 500 et body erreur)
    return res.status(500).json({erreur: 'Erreur serveur'});
  }
});

//GET api/users/:id
router.get('/:id', async (req : Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await findUserById(id)

  return res.json(user);
})

//POST /api/users
router.post('/', async (req: Request, res: Response) => {
  //déstructuration du req.body pour ne garder que le prénom et le nom
  const { firstName, lastName } = req.body;
  const user = await createUser({ firstName, lastName })
  return res.status(201).json(user);
});

//PUT /api/users/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  //déstructuration du req.body pour ne garder que le prénom et le nom
  const { firstName, lastName } = req.body;


  const user = await updateUser(id,{ firstName, lastName })
  if (!user) {
    return res.json(user);
  }
});


//DELETE /api/users
router.delete('/:id' ,async (req : Request, res : Response) => {
  const id = Number(req.params.id)
  
  const userDeleted = await deleteUser(id);

  //retourne que le user a bien été supprimé
  return res.send(204).send('Utilisateur supprimé');
})

export default router;
