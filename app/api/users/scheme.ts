import z from "zod";

export const schema = z.object({
  name: z.string().trim().min(3),
  email: z.email().trim().toLowerCase(),
});

export const schemaPatch = z.object({
  name: z.string().trim().min(3).optional(),
  email: z.email().trim().toLowerCase().optional(),
});