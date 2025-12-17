import mongoose from "mongoose";
import { DB_COLLECTION_STRING } from "./env";

mongoose.connect(DB_COLLECTION_STRING as string);
mongoose.set("debug", false);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  throw new Error("Mongo connection failed");
});

function close() {
  mongoose.disconnect();
}

export { close, mongoose };

export default mongoose;
