import mongoose, { Document, Schema } from "mongoose";

export interface commentDocument extends Document {
  userId: mongoose.Types.ObjectId;
  quarrel: mongoose.Types.ObjectId;
  content: string;
  createAt: Date;
}

const commentSchema = new Schema<commentDocument>(
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
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<commentDocument>("comment", commentSchema);
export default Comment;
