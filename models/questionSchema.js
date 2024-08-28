import { Schema } from "mongoose";

// Base schema for all question types
const baseQuestionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "multipleChoiceSingle",
        "multipleChoiceMultiple",
        "matching",
        "fillInTheBlank",
        "trueFalse",
        "arrangeWords",
      ],
    },
  },
  { discriminatorKey: "type", _id: false }
);

// Specific question schemas
const multipleChoiceSingleSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const multipleChoiceMultipleSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswers: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

const matchingQuestionSchema = new Schema(
  {
    items: [
      {
        prompt: {
          type: String,
          required: true,
        },
        match: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { _id: false }
);

const fillInTheBlankQuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    blanks: [
      {
        placeholder: {
          type: Number,
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
    randomWords: {
      type: [String],
    },
  },
  { _id: false }
);

const trueFalseQuestionSchema = new Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const arrangeWordsQuestionSchema = new Schema(
  {
    words: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

export {
  baseQuestionSchema,
  multipleChoiceSingleSchema,
  multipleChoiceMultipleSchema,
  matchingQuestionSchema,
  fillInTheBlankQuestionSchema,
  trueFalseQuestionSchema,
  arrangeWordsQuestionSchema,
};
