import { Schema, model, Types } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: {
      type: [Types.ObjectId],
      ref: "User",
    },

    message: {
      type: [Types.ObjectId],
      ref: "Message",
    },
  },
  { timestamps: true }
);

export default model("COnversation", conversationSchema, "Conversations");
