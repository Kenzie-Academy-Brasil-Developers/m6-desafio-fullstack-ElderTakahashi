import { Request, Response } from "express";
import { UserReturn } from "../interfaces/users.interface";
import {
  createAdminUserService,
  createCommonUserService,
  deleteUserService,
  readAllUsersService,
  readUserByIdService,
  updateUserService,
} from "../services/users.service";

export const createCommonUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: UserReturn = await createCommonUserService(req.body);

  return res.status(201).json(user);
};

export const createAdminUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: UserReturn = await createAdminUserService(req.body);

  return res.status(201).json(user);
};

export const readUserByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  const user = await readUserByIdService(userId);

  return res.status(200).json(user);
};

export const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await readAllUsersService();
  return res.status(200).json(users);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  const updatedUser = await updateUserService(req.body, userId);
  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  await deleteUserService(userId);
  return res.status(204).json();
};
