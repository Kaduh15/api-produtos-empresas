import type { Request, Response } from "express";
import { InternalServerError } from "@/helpers/http-errors";
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
			throw new InternalServerError();
		}

		const data = req.body;

		const result = await this.service.update({ id, data });

		res.status(HttpStatus.OK).json(result);
		return;
	};

	getById = async (req: Request, res: Response) => {
		const id = req.params.id || req.user?.id;
		console.log("🚀 ~ CompanyController ~ getById= ~ id:", id);
		if (!id) {
			throw new InternalServerError();
		}

		const result = await this.service.getById(id);

		res.status(HttpStatus.OK).json(result);
		return;
	};

	getAll = async (_req: Request, res: Response) => {
		const result = await this.service.getAll();

		res.status(HttpStatus.OK).json(result);
		return;
	};
}
