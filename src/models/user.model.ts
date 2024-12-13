import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
})

export default model("User", userSchema, "users")