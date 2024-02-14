import { User } from "../entities";
import {
  UserCreate,
  UserReturn,
  UserUpdate,
  UserReadReturn,
  UserReadAllReturn,
  UserBodyUpdate,
  UserWithoutAdmin,
} from "../interfaces/users.interface";
import { userRepo } from "../repositories";
import {
  userReturnListSchema,
  userReturnSchema,
  userReturnWithContactsSchema,
} from "../schemas/users.schema";

export const createCommonUserService = async (
  data: UserWithoutAdmin
): Promise<UserReturn> => {
  const user: User = userRepo.create(data);

  await userRepo.save(user);

  return userReturnSchema.parse(user);
};

export const createAdminUserService = async (
  data: UserCreate
): Promise<UserReturn> => {
  const user: User = userRepo.create(data);

  await userRepo.save(user);

  return userReturnSchema.parse(user);
};

export const readUserByIdService = async (
  userId: string
): Promise<UserReadReturn> => {
  const user: User | null = await userRepo.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  return userReturnWithContactsSchema.parse(user);
};

export const readAllUsersService = async (): Promise<UserReadAllReturn> => {
  const users: User[] = await userRepo.find({
    relations: ["contacts"],
  });

  return userReturnListSchema.parse(users);
};

export const updateUserService = async (
  data: UserBodyUpdate,
  userId: string
): Promise<UserUpdate> => {
  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });
  const userUpdated: User = userRepo.create({ ...user, ...data });

  await userRepo.save(userUpdated);

  return userReturnSchema.parse(userUpdated);
};

export const deleteUserService = async (userId: string): Promise<void> => {
  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });
  await userRepo.remove(user!);
};
