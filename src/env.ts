import z from "zod";

export const env = z
	.object({
		PORT: z.coerce.number().default(3000),
		URL_CORS: z.string().default("*"),
		JWT_SECRET: z.string().default("your-secret-key"),
		DATABASE_URL: z.string().url().default("postgres://user:password@localhost:5432/dbname"),
	})
	.parse(process.env);
