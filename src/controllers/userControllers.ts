import type { Request, Response, NextFunction } from 'express'
import User from "../models/User.js"

//Services pour récuperer tous les users de l'api
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        return res.status(200).json();
    }
    catch (error) {
        return next(error);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //déstructuration pour recup que 2 éléments.
        const { firstName, lastName } = req.body;
        const user = await User.create(req.body);

        return res.status(200).json(user);
    }
    catch (error) {
        return next(error);
    }
}

export const deleteUser = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const user = await User.findByPk(id);

        if (!user) {
            const err = new Error("Pas de user ayant cet ID") as Error & { status?: number };
            err.status = 404;
            return next(err);
        }

        await user.destroy();
        res.json({ message : `${user} a bien été supprimé`})
    }
    catch (error) {
        return next(error);
    }
}
