import z from "zod";

export const schema = z.object({
  name: z.string().trim().min(3),
  price: z.int().min(1).max(100),
});

export const schemaPatch = z.object({
  name: z.string().trim().min(3).optional(),
  price: z.int().min(1).max(100),
});