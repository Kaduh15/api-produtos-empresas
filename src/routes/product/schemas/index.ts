import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive()
})

export type CreateProductSchema = z.infer<typeof createProductSchema>

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  price: z.number().positive().optional()
})

export type UpdateProductSchema = z.infer<typeof updateProductSchema>

