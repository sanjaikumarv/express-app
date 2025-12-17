import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    conversation: {
      type: Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Message", messageSchema, "messages");
