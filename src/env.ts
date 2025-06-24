import z from "zod";

export const env = z
	.object({
		PORT: z.coerce.number().default(3000),
		URL_CORS: z.string().default("*"),
	})
	.parse(process.env);
