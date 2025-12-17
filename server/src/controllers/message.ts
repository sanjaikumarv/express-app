import { Response } from "express";
import conversationModel from "../models/conversation.model";
import { ReqUser } from "../interface";
import messageModel from "../models/message.model";
import { io } from "../config/socket";
import { Types } from "mongoose";

export async function createMessage(req: ReqUser, res: Response) {
  let conversation = await conversationModel.findOne({
    participants: { $all: [req.user._id, req.params.id] },
  });

  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [req.user._id, req.params.id],
    });
  }
  const message = await messageModel.create({
    senderId: req.user._id,
    receiverId: req.params.id,
    message: req.body.message,
    conversation: conversation._id,
    date: new Date(),
  });

  if (message) {
    conversation.message.push(message._id);
  }
  if (conversation) {
    io.to(conversation._id.toString()).emit("message", message);
  }

  const newMessage = await message.save();
  await conversation.save();

  return res.status(200).json(newMessage);
}

export async function getMessages(req: ReqUser, res: Response) {
  const conversation = await conversationModel.findOne({
    participants: { $all: [req.user._id, req.params.id] },
  });
  if (!conversation) {
    return res.status(200).json([]);
  }
  const messages = await messageModel
    .find({
      conversation: conversation._id,
    })
    .populate("receiverId");
  res.status(200).json(messages);
}

export async function getConversations(req: ReqUser, res: Response) {
  try {
    const userId = req.user._id;
    const conversations = await conversationModel.aggregate([
      {
        $match: {
          participants: {
            $in: [userId],
          },
        },
      },
      {
        $project: {
          participants: {
            $filter: {
              input: "$participants",
              as: "participant",
              cond: { $ne: ["$$participant", userId] },
            },
          },
          message: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participants",
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);
    console.log("conversations---->", conversations);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", error });
  }
}
