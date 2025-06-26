import type { Request, Response } from "express";

import { HttpStatus } from "@/helpers/http-status";

import type { CompanyService } from "./company.service";
import { createCompanySchema } from "./schemas";

export class CompanyController {
	private service: CompanyService;

	constructor(service: CompanyService) {
		this.service = service;
	}

	create = async (req: Request, res: Response) => {
		const data = createCompanySchema.parse(req.body);

		const result = await this.service.create(data);

		res.status(HttpStatus.CREATED).json(result);
		return;
	};

	update = async (req: Request, res: Response) => {
		const id = req.user?.id;
		if (!id) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: "Internal server error",
			});
			return;
		}

		const data = req.body;

		const result = await this.service.update({ id, data });

		res.status(HttpStatus.OK).json(result);
		return;
	};

	getById = async (req: Request, res: Response) => {
		const id = req.params.id || req.user?.id;
		if (!id) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: "Internal server error",
			});
			return;
		}

		const result = await this.service.getById(id);

		res.status(HttpStatus.OK).json(result);
		return;
	};
}
