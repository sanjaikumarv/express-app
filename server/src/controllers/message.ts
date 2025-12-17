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

  await Promise.allSettled([message.save(), conversation.save()]);

  const messageData = {
    _id: message._id.toString(),
    senderId: req.user._id.toString(),
    receiverId: req.params.id,
    message: req.body.message,
    conversationId: conversation._id.toString(),
    createdAt: message.createdAt || new Date(),
  };

  return res.status(200).json(messageData);
}

export async function getMessages(req: ReqUser, res: Response) {
  console.log("reder");
  const messages = await messageModel
    .find({ senderId: req.user._id })
    .populate("receiverId");

  res.status(200).json(messages);
}
