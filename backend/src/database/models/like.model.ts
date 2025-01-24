import mongoose, { Document, Schema } from "mongoose";

export interface likeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  quarrel: mongoose.Types.ObjectId;
}

const likeSchema = new Schema<likeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quarrel: {
      type: Schema.Types.ObjectId,
      ref: "Quarrel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model<likeDocument>("like", likeSchema);
export default Like;
