import { z } from "zod";

export const createCompanySchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;

export const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
})

export type UpdateCompanySchema = z.infer<typeof updateCompanySchema>;
