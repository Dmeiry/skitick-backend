import { Schema, model } from "mongoose";
import boardSchema from "./boardUserSchema.js";
const userSchema = new Schema(
  {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    auth: {
      type: Boolean,
      required: true,
    },
    class: {
      type: String,
    },
    currentBoard: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
    firstname: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    lastname: {
      type: String,
    },
    myBoards: {
      type: [boardSchema],
      default: [],
    },
    myStickers: {
      type: [String],
      default: [],
    },
    score: {
      type: Number,
    },
    status: {
      type: String,
      default: 1,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema, "users");

export default User;
