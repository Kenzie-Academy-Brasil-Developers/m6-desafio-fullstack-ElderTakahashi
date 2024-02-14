import { Router } from "express";
import {
  createCommonUserController,
  deleteUserController,
  readAllUsersController,
  readUserByIdController,
  updateUserController,
} from "../controllers/users.controller";
import {
  validateBody,
  verifyPermissions,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  userCreateSchema,
  userUpdateSchema,
  userWithoutAdminSchema,
} from "../schemas/users.schema";
import {
  verifyUniqueUserEmail,
  verifyUserExists,
} from "../middlewares/users.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(userWithoutAdminSchema),
  verifyUniqueUserEmail,
  createCommonUserController
);

userRouter.post(
  "/admin",
  validateBody(userCreateSchema),
  verifyUniqueUserEmail,
  createCommonUserController
);

userRouter.get("/", verifyToken, verifyPermissions, readAllUsersController);
userRouter.get(
  "/:userId",
  verifyToken,
  verifyPermissions,
  verifyUserExists,
  readUserByIdController
);

userRouter.patch(
  "/:userId",
  validateBody(userUpdateSchema),
  verifyToken,
  verifyUserExists,
  verifyPermissions,
  updateUserController
);

userRouter.delete(
  "/:userId",
  verifyToken,
  verifyUserExists,
  verifyPermissions,
  deleteUserController
);
