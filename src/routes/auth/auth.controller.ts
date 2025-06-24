import type { Request, Response } from "express";
import {HttpStatus} from "@/helpers/http-status";

import type { AuthService } from "./auth.service";

export class AuthController {
	private service: AuthService;

	constructor(service: AuthService) {
		this.service = service;
	}

	login = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const token = await this.service.login({ email, password });

		res.status(HttpStatus.OK).json(token);
    return;
	};
}
