import { Router } from "express";

import prisma from "@/libs/prismaClient";
import authMiddleware from "@/middlewares/auth.middleware";

import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

const productService = new ProductService(prisma);
const productController = new ProductController(productService);

const productRouter = Router();

const path = "/product";

productRouter.post(path, productController.create);
productRouter.get(path, authMiddleware(), productController.getAll);
productRouter.get(`${path}/:id`, authMiddleware(), productController.getById);
productRouter.put(`${path}/:id`, authMiddleware(), productController.update);
productRouter.delete(`${path}/:id`, authMiddleware(), productController.remove);

export { productRouter };
