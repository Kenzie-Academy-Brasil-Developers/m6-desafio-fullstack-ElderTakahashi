import { NextFunction, Request, Response } from "express";
import { Contact } from "../entities";
import { contactRepo } from "../repositories";
import AppError from "../errors/AppErrors.error";

export const verifyContactExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { contactId } = req.params;

  const contact: Contact | null = await contactRepo.findOneBy({
    id: contactId,
  });

  if (!contact) throw new AppError("Contact not found", 404);

  return next();
};

export const verifyContactOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  const { sub } = res.locals.decoded;

  const contact = await contactRepo.findOne({
    where: {
      id: contactId,
    },
    relations: {
      user: true,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  if (contact.user.id !== sub) {
    throw new AppError("You dont have permissions", 403);
  }
  return next();
};
