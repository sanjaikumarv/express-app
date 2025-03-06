import { Response } from "express";
import conversationModel from "../../models/conversation.model"
import { ReqUser } from "../../interface";
import messageModel from "../../models/message.model";

export async function createMessage(req: ReqUser, res: Response) {

    let conversation = await conversationModel.findById({ participents: { $in: [req.user._id, req.params.id] } })

    const message = await new messageModel({
        senderId: req.user._id,
        receiverId: req.params.id,
        message: req.body.message
    })
    if (!conversation) {
        conversation = await conversationModel.create({ participents: [req.user._id, req.params.id] })
    }

    if (message) {
        conversation.message.push(message._id)
    }

    await Promise.allSettled([message.save(), conversation.save()])

    return res.status(200).json(message)

}

export async function getMessages(req: ReqUser, res: Response) {
    const messages = await messageModel.find({ senderId: req.user._id }).populate("receiverId")

    res.status(200).json(messages)
}