import { Router } from "express";

import prisma from "@/libs/prismaClient";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authService = new AuthService(prisma);
const authController = new AuthController(authService);

const authRouter = Router();

const path = "/auth";

authRouter.post(path, authController.login);

export { authRouter };
