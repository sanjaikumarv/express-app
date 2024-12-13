import { Schema, model, Types } from "mongoose"

const conversationSchema = new Schema({
    participents: {
        type: [Types.ObjectId],
        ref: "User"
    },
    message: {
        type: [Types.ObjectId],
        ref: ""
    }
})