import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          // Regular expression to validate phone number
          const phoneRegex = /^\+?[1-9]\d{1,14}$/;
          return phoneRegex.test(value);
        },
        message: "Invalid phone number",
      },
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
      required: true,
    },
    imageUrl: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    myBoards: {
      type: [
        {
          board: {
            type: Schema.Types.ObjectId,
            ref: "board",
          },
          progress: {
            type: Number,
            default: 0,
          },
          answers: {
            type: Map,
            of: Schema.Types.Mixed, // Allows storing different types of answers
            default: new Map(),
            // You can add a validation function to enforce that keys are ObjectId strings
            validate: {
              validator: function (map) {
                for (let key of map.keys()) {
                  if (!Schema.Types.ObjectId.isValid(key)) {
                    return false;
                  }
                }
                return true;
              },
              message: "All keys in answers must be valid ObjectId strings",
            },
          },
        },
      ],
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
