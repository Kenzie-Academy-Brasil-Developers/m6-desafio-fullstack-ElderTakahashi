import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppErrors.error";
import { User } from "../entities";
import { userRepo } from "../repositories";

export const verifyUniqueUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  const user: User | null = await userRepo.findOneBy({ email });

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

export const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const user: User | null = await userRepo.findOneBy({
    id: String(userId),
  });

  if (!user) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, user };

  return next();
};
