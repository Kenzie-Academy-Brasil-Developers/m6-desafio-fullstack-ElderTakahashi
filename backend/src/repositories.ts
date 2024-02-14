import { Contact, User } from "./entities";
import { AppDataSource } from "./data-source";
import { UserRepo } from "./interfaces/users.interface";
import { ContactRepo } from "./interfaces/contacts.interface";

export const userRepo: UserRepo = AppDataSource.getRepository(User);
export const contactRepo: ContactRepo = AppDataSource.getRepository(Contact);
