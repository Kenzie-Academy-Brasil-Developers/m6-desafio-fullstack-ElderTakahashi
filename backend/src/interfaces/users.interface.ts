import { z } from "zod";
import {
  userCreateSchema,
  userLoginSchema,
  userReturnSchema,
  userReturnWithContactsSchema,
  userWithoutAdminSchema,
} from "../schemas/users.schema";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

export type UserCreate = z.infer<typeof userCreateSchema>;

export type UserWithoutAdmin = z.infer<typeof userWithoutAdminSchema>;

export type UserBodyUpdate = UserCreate;

export type UserUpdate = DeepPartial<UserBodyUpdate>;

export type UserReturn = z.infer<typeof userReturnSchema>;

export type UserReadReturn = z.infer<typeof userReturnWithContactsSchema>;

export type UserReadAllReturn = UserReturn[];

export type UserLogin = z.infer<typeof userLoginSchema>;

export type LoginReturn = { userId: string; token: string };

export type UserRepo = Repository<User>;
