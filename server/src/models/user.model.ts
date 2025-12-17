import { Schema, model } from "mongoose";

interface User {
  name: string;
  email: string;
  phone: number;
  online: boolean;
  password: string;
  authToken: string;
  refreshTokens: string[];
}

const userSchema = new Schema<User>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  refreshTokens: {
    type: [String],
  },
  authToken: {
    type: String,
  },
});

export default model<User>("User", userSchema, "users");
