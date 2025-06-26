import argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { env } from "@/env";
import type { PrismaClient } from "@/generated/prisma";
import { NotFoundError, UnauthorizedError } from "@/helpers/http-errors";

import type { AuthLoginSchema } from "./schemas";

export class AuthService {
	private model: PrismaClient;

	constructor(model: PrismaClient) {
		this.model = model;
	}

	async login({ email, password }: AuthLoginSchema) {
		const user = await this.model.company.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				password: true,
			},
		});

		if (!user) {
			throw new NotFoundError("User not found");
		}
		let isPasswordValid = false;

		try {
			isPasswordValid = await argon2.verify(user.password, password);
		} catch {
			throw new UnauthorizedError("Data is not valid");
		}

		if (!isPasswordValid) {
			throw new UnauthorizedError("Data is not valid");
		}

		const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return { token };
	}
}
