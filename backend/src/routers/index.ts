import { Router } from "express";
import { userRouter } from "./users.router";
import { sessionRouter } from "./session.router";
import { contactRouter } from "./contacts.router";

export const routes: Router = Router();

routes.use("/users", userRouter);
routes.use("/login", sessionRouter);
routes.use("/contacts", contactRouter);
