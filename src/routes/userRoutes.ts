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
  try {
    //récupère l'id
    const id = Number(req.params.id);
    //teste si id est NUMBER et >= 0
    if (!Number.isInteger(id)|| id <= 0) {
      return res.status(400).json({error: 'ID invalide'});
    }
    //Récupère le user dans la db
    const user = await findUserById(id);
    //teste si on a bien récupéré un USER
    if (!user) {
      return res.status(404).json({error: 'Pas de user ayant cet ID'});
    }
    //retourne le user
    return res.json(user);
  }
  catch (error) {
    //affiche l'erreur
    console.error('Erreur:', error);
    //retourne réponse http 500 et body erreur
    return res.status(500).json({erreur: 'Erreur serveur'})
  }
});

//POST /api/users
router.post('/', async (req: Request, res: Response) => {
  try {
    //déstructuration du req.body pour ne garder que le prénom et le nom
    const { firstName, lastName } = req.body;
    const user = await createUser({ firstName, lastName })
    return res.status(201).json(user);
  }
  catch (error) {
    //affiche l'erreur
    console.error('Erreur:', error);
    //retourne réponse http 500 et body erreur
    return res.status(500).json({erreur: 'Erreur serveur'})
  }
});

//PUT /api/users/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    //teste si id est NUMBER et >= 0
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    //déstructuration du req.body pour ne garder que le prénom et le nom
    const { firstName, lastName } = req.body;
    const user = await updateUser(id,{ firstName, lastName })
    //vérifier si on a bien récupéré un user
    if (!user) {
      return res.status(404).json({error: 'Pas de user ayant cet ID' });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    //affiche l'erreur
    console.error('Erreur:', error);
    //retourne réponse http 500 et body erreur
    return res.status(500).json({erreur: 'Erreur serveur'})
  }
});


//DELETE /api/users
router.delete('/:id' ,async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id)
    //teste si id est NUMBER et >= 0
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID invalide' });
      }

    const userDeleted = await deleteUser(id);
    //deleteUser retourne soit true ou false donc on peut faire un test dessus
    if (!userDeleted) {
        return res.status(404).json({ error: 'Pas de user ayant cet ID' });
      }

    //retourne que le user a bien été supprimé
    return res.status(204).send('Utilisateur supprimé');
    }
  catch (error) {
    console.log('Erreur:', error);
    return res.status(500).json({errer: 'Erreur serveur' });
  }
})

export default router;
