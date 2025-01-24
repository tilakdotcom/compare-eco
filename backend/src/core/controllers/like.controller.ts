import { likeSchema } from "../../common/schemas/like";
import { CREATED } from "../../constants/http";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { newLikeService } from "../services/like.service";

export const likePost = asyncHandler(async (req, res) => {
  const { quarrelId, userId } = likeSchema.parse({
    userId: req.userId,
    quarrelId: req.params.quarrelId,
  });

  const { like } = await newLikeService({ quarrelId, userId });
  return res.status(CREATED).json({
    message: "Like created successfully",
    data: like,
  });
});

export const totalLikes = asyncHandler(async (req, res) => {
  const { quarrelId, userId } = likeSchema.parse({
    userId: req.userId,
    quarrelId: req.params.quarrelId,
  });
})
