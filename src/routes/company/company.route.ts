import { Router } from "express";

import prisma from "@/libs/prismaClient";
import authMiddleware from "@/middlewares/auth.middleware";

import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

const companyService = new CompanyService(prisma);
const companyController = new CompanyController(companyService);

const companyRouter = Router();

const path = "/company";

companyRouter.post(path, companyController.create);
companyRouter.put(path, authMiddleware(), companyController.update);
companyRouter.get(path, companyController.getAll);
companyRouter.get(`${path}/me`, authMiddleware(), companyController.getById);
companyRouter.get(`${path}/:id`, companyController.getById);

export { companyRouter };
