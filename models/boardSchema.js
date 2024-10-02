import { Schema, model } from "mongoose";
import {
  baseQuestionSchema,
  multipleChoiceSingleSchema,
  multipleChoiceMultipleSchema,
  matchingQuestionSchema,
  fillInTheBlankQuestionSchema,
  trueFalseQuestionSchema,
  arrangeWordsQuestionSchema,
} from "./questionSchema.js";
import  { RECORD_STATUS } from "../constants/statusCodes.js";

export const boardSchema = new Schema(
  {
    album: {
      type: String,
      required: true,
    },
    numOfQuestions: {
      type: Number,
      required: true,
    },
    questions: {
      type: [baseQuestionSchema],
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    minscore: {
      type: Number,
      required: true,
    },
    numoftries: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [
        RECORD_STATUS.ACTIVE,
        RECORD_STATUS.INACTIVE,
        RECORD_STATUS.DELETED,
      ], // 0: active, 1: unactive, 2: delete
      default: RECORD_STATUS.ACTIVE, // Default status can be set if needed
    },
    backgroundImageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    numofstickers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
boardSchema
  .path("questions")
  .discriminator("multipleChoiceSingle", multipleChoiceSingleSchema);
boardSchema
  .path("questions")
  .discriminator("multipleChoiceMultiple", multipleChoiceMultipleSchema);
boardSchema.path("questions").discriminator("matching", matchingQuestionSchema);
boardSchema
  .path("questions")
  .discriminator("fillInTheBlank", fillInTheBlankQuestionSchema);
boardSchema
  .path("questions")
  .discriminator("trueFalse", trueFalseQuestionSchema);
boardSchema
  .path("questions")
  .discriminator("arrangeWords", arrangeWordsQuestionSchema);
const Board = model("board", boardSchema, "board");

export default Board;
