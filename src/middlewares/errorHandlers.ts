// src/middlewares/errorHandlers.ts
import type { Request, Response, NextFunction } from "express";

export const errorSender = (err: Error & { status?: number },req: Request,res: Response, next: NextFunction) => {
  console.error(err);

  const status = err.status ?? 500;
  const message = err.message ?? "Erreur interne du serveur";

  res.status(status).json({ error: message });
};
