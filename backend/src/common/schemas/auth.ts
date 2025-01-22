import { z } from "zod";

export const passwordSchema = z.string().min(6).max(20);
export const emailSchema = z.string().email();

export const registerSchema = z.object({
  user: z.string().min(3).max(255),
  email: emailSchema,
  password: passwordSchema,
});
