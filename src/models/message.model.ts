import { required } from "joi"
import { Schema, model, Types } from "mongoose"

const messageSchema = new Schema({
    senderId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    reciverId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default model("Message", messageSchema, "messages")