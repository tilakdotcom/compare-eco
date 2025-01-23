import mongoose, { Document, Schema } from "mongoose";

export interface quarrelDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  image: string;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const quarrelSchema = new Schema<quarrelDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      default: "",
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quarrel = mongoose.model<quarrelDocument>("Quarrel", quarrelSchema);
export default Quarrel;
