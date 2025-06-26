import argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { env } from "@/env";
import type { PrismaClient } from "@/generated/prisma";
import { NotFoundError } from "@/helpers/http-errors";

import type { CreateCompanySchema, UpdateCompanySchema } from "./schemas";

export class CompanyService {
	private model: PrismaClient;

	constructor(model: PrismaClient) {
		this.model = model;
	}

	async create({ email, password, name }: CreateCompanySchema) {
		const company = !!(await this.model.company.findUnique({
			where: { email },
		}));

		if (company) {
			throw new NotFoundError("Company already exists");
		}

		const hashedPassword = await argon2.hash(password);

		const newCompany = await this.model.company.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return {
			data: newCompany,
			token: jwt.sign(
				{ sub: newCompany.id, email: newCompany.email },
				env.JWT_SECRET,
				{
					expiresIn: "1d",
				},
			),
		};
	}

	async update({ data, id }: { id: string; data: UpdateCompanySchema }) {
		const company = await this.model.company.findUnique({
			where: { id },
		});

		if (!company) {
			throw new NotFoundError("Company not found");
		}

		const updatedData: Partial<UpdateCompanySchema> = {
			...data,
		};

		if (data.password) {
			updatedData.password = await argon2.hash(data.password);
		}

		const updatedCompany = await this.model.company.update({
			where: { id },
			data: updatedData,
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return {
			data: updatedCompany,
		};
	}

	async getById(id: string) {
		const company = await this.model.company.findUnique({
			where: { id },
			include: {
				products: {
					select: {
						id: true,
						name: true,
						price: true,
					},
				},
			},
		});

		if (!company) {
			throw new NotFoundError("Company not found");
		}

		const { password: _, ...companyWithoutPassword } = company;

		return {
			data: companyWithoutPassword,
		};
	}

	async getAll() {
		const companies = await this.model.company.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		if (!companies || companies.length === 0) {
			throw new NotFoundError("No companies found");
		}

		return {
			data: companies,
		};
	}
}
