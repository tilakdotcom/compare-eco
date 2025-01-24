import { z } from "zod";
import { mongoIdSchema } from "./quarrel";

export const likeSchema = z.object({
  userId: mongoIdSchema,
  quarrelId: mongoIdSchema,
});
