import type { PrismaClient } from "@/generated/prisma";
import { NotFoundError } from "@/helpers/http-errors";

import type { CreateProductSchema, UpdateProductSchema } from "./schemas";

export class ProductService {
	private model: PrismaClient;

	constructor(model: PrismaClient) {
		this.model = model;
	}

	async create({
		data,
		companyId,
	}: {
		data: CreateProductSchema;
		companyId: string;
	}) {
		const company = !!(await this.model.company.findUnique({
			where: { id: companyId },
		}));

		if (!company) {
			throw new NotFoundError("Company not found");
		}

		const newProduct = await this.model.product.create({
			data: {
				name: data.name,
				price: data.price,
				companyId,
			},
			select: {
				id: true,
				name: true,
				price: true,
			},
		});

		return {
			data: newProduct,
		};
	}

	async update({
		data,
		idCompany,
		idProduct,
	}: {
		idProduct: string;
		idCompany: string;
		data: UpdateProductSchema;
	}) {
		const product = await this.model.product.findUnique({
			where: { id: idProduct, companyId: idCompany },
		});

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		const updatedData: Partial<UpdateProductSchema> = {
			...data,
		};

		const updatedProduct = await this.model.product.update({
			where: { id: idProduct, companyId: idCompany },
			data: updatedData,
		});

		return {
			data: updatedProduct,
		};
	}

	async getById({
		idCompany,
		idProduct,
	}: {
		idCompany: string;
		idProduct: string;
	}) {
		const product = await this.model.product.findUnique({
			where: { id: idProduct, companyId: idCompany },
		});

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		return {
			data: product,
		};
	}

	async getAll({ idCompany }: { idCompany: string }) {
		const products = await this.model.product.findMany({
			where: { companyId: idCompany },
			select: {
				id: true,
				name: true,
				price: true,
			},
		});

		return {
			data: products,
		};
	}

	async remove({
		idCompany,
		idProduct,
	}: {
		idCompany: string;
		idProduct: string;
	}) {
		const product = await this.model.product.findUnique({
			where: { id: idProduct, companyId: idCompany },
		});

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		await this.model.product.delete({
			where: { id: idProduct, companyId: idCompany },
		});
	}
}
