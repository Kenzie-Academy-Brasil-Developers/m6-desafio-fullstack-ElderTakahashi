import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  readAllContactsController,
  updateContactController,
} from "../controllers/contacts.controller";
import { verifyUserExists } from "../middlewares/users.middleware";
import {
  validateBody,
  verifyPermissions,
  verifyToken,
} from "../middlewares/globals.middleware";
import { verifyContactOwner } from "../middlewares/contacts.middleware";
import {
  contactCreateSchema,
  contactUpdateSchema,
} from "../schemas/contacts.schema";

export const contactRouter: Router = Router();
contactRouter.post(
  "/",
  validateBody(contactCreateSchema),
  verifyToken,
  createContactController
);
contactRouter.get(
  "/:userId",
  verifyToken,
  verifyPermissions,
  verifyUserExists,
  readAllContactsController
);

contactRouter.patch(
  "/:contactId",
  validateBody(contactUpdateSchema),
  verifyToken,
  verifyContactOwner,
  updateContactController
);
contactRouter.delete(
  "/:contactId",
  verifyToken,
  verifyContactOwner,
  deleteContactController
);
