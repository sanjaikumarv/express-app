import { Response } from "express";
import conversationModel from "../models/conversation.model";
import { ReqUser } from "../interface";
import messageModel from "../models/message.model";

export async function createMessage(req: ReqUser, res: Response) {
  let conversation = await conversationModel.findOne({
    participants: { $all: [req.user._id, req.params.id] },
  });

  const message = await messageModel.create({
    senderId: req.user._id,
    receiverId: req.params.id,
    message: req.body.message,
    conversation: conversation._id,
    date: new Date(),
  });

  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [req.user._id, req.params.id],
    });
  }

  if (message) {
    conversation.message.push(message._id);
  }

  const newMessage = await message.save();
  await conversation.save();

  return res.status(200).json(newMessage);
}

export async function getMessages(req: ReqUser, res: Response) {
  const conversation = await conversationModel.findOne({
    participants: { $all: [req.user._id, req.params.id] },
  });
  const messages = await messageModel
    .find({
      conversation: conversation._id,
    })
    .populate("receiverId");
  res.status(200).json(messages);
}
