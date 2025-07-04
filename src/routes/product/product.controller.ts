import type { Request, Response } from "express";

import { InternalServerError } from "@/helpers/http-errors";
import { HttpStatus } from "@/helpers/http-status";

import type { ProductService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./schemas";

export class ProductController {
	private service: ProductService;

	constructor(service: ProductService) {
		this.service = service;
	}

	create = async (req: Request, res: Response) => {
		const id = req.user?.id;
		console.log("🚀 ~ ProductController ~ create= ~ id:", id);

		if (!id) {
			throw new InternalServerError();
		}

		const data = createProductSchema.parse(req.body);

		const result = await this.service.create({ data, companyId: id });

		res.status(HttpStatus.CREATED).json(result);
		return;
	};

	update = async (req: Request, res: Response) => {
		const idCompany = req.user?.id;
		if (!idCompany) {
			throw new InternalServerError();
		}

		const idProduct = req.params.id;

		const data = updateProductSchema.parse(req.body);

		const result = await this.service.update({ idCompany, idProduct, data });

		res.status(HttpStatus.OK).json(result);
		return;
	};

	getById = async (req: Request, res: Response) => {
		const idCompany = req.user?.id;
		if (!idCompany) {
			throw new InternalServerError();
		}

		const idProduct = req.params.id;

		const result = await this.service.getById({ idCompany, idProduct });

		res.status(HttpStatus.OK).json(result);
		return;
	};

	getAll = async (req: Request, res: Response) => {
		const idCompany = req.user?.id;
		if (!idCompany) {
			throw new InternalServerError();
		}

		const result = await this.service.getAll({ idCompany });
		res.status(HttpStatus.OK).json(result);
		return;
	};

	remove = async (req: Request, res: Response) => {
		const idCompany = req.user?.id;
		if (!idCompany) {
			throw new InternalServerError();
		}

		const idProduct = req.params.id;

		await this.service.remove({ idCompany, idProduct });

		res.status(HttpStatus.NO_CONTENT).send();
		return;
	};
}
