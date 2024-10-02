import { Schema } from "mongoose";
import {
  baseQuestionSchema as originalBaseQuestionSchema,
  multipleChoiceSingleSchema as originalMultipleChoiceSingleSchema,
  multipleChoiceMultipleSchema as originalMultipleChoiceMultipleSchema,
  matchingQuestionSchema as originalMatchingQuestionSchema,
  fillInTheBlankQuestionSchema as originalFillInTheBlankQuestionSchema,
  trueFalseQuestionSchema as originalTrueFalseQuestionSchema,
  arrangeWordsQuestionSchema as originalArrangeWordsQuestionSchema,
} from "./questionSchema.js";

const baseQuestionSchema = new Schema(
  {
    ...originalBaseQuestionSchema.obj,
    userAnswer: {
      type: Schema.Types.Mixed, // Mixed type to allow different formats (string, array, boolean, etc.)
    },
  },
  { discriminatorKey: "type" }
);

// Extend the specific question schemas to include 'userAnswer'
const multipleChoiceSingleSchema = new Schema({
  ...originalMultipleChoiceSingleSchema.obj,
  userAnswer: {
    type: String,
  },
});

const multipleChoiceMultipleSchema = new Schema({
  ...originalMultipleChoiceMultipleSchema.obj,
  userAnswer: {
    type: [String],
  },
});

const matchingQuestionSchema = new Schema({
  ...originalMatchingQuestionSchema.obj,
  userAnswers: [
    {
      prompt: {
        type: String,
        required: true,
      },
      userMatch: {
        type: String,
      },
    },
  ],
});

const fillInTheBlankQuestionSchema = new Schema({
  ...originalFillInTheBlankQuestionSchema.obj,
  userAnswers: [
    {
      placeholder: {
        type: Number,
        required: true,
      },
      userAnswer: {
        type: String,
      },
    },
  ],
});

const trueFalseQuestionSchema = new Schema({
  ...originalTrueFalseQuestionSchema.obj,
  userAnswer: {
    type: Boolean,
  },
});

const arrangeWordsQuestionSchema = new Schema({
  ...originalArrangeWordsQuestionSchema.obj,
  userAnswer: {
    type: [String], // Assuming user provides an array of words in the correct order
  },
});

export {
  baseQuestionSchema,
  multipleChoiceSingleSchema,
  multipleChoiceMultipleSchema,
  matchingQuestionSchema,
  fillInTheBlankQuestionSchema,
  trueFalseQuestionSchema,
  arrangeWordsQuestionSchema,
};
