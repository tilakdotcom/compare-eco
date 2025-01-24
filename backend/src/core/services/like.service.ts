import mongoose from "mongoose";
import Like from "../../database/models/like.model";

type LikeData = {
  quarrelId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
};

export const newLikeService = async (data: LikeData) => {
  const likeExists = await Like.findOne({
    userId: data.userId,
    quarrel: data.quarrelId,
  });
  if (likeExists) {
    await likeExists.deleteOne();
  }
  const like = await Like.create({
    userId: data.userId,
    quarrel: data.quarrelId,
  });
  return { like };
};
