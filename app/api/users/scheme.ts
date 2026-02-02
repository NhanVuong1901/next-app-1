import z from "zod";

export const schema = z.object({
  name: z.string().trim().min(3),
  email: z.email().trim().toLowerCase(),
});
