import mongoose from "mongoose";
import { z } from "zod";

export const imageSchema = z.object({
  mimetype: z
    .string()
    .refine(
      (mimetype) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(mimetype),
      { message: "Invalid image file type" }
    ),
  size: z.number().max(5 * 1024 * 1024, "File size must be less than 5MB"),
  fieldname: z.string().optional(),
  originalname: z.string(),
  destination: z.string(),
  filename: z.string().optional(),
  path: z.string(),
});

export const quarrelSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters long"),
  content: z.string().min(5, "Description must be at least 5 characters long"),
  expireAt: z.string(),
});

export const mongoIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));
