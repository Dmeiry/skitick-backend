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
  { discriminatorKey: "type" }
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
  }
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
  }
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
  }
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
  }
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
  }
);

const arrangeWordsQuestionSchema = new Schema(
  {
    words: {
      type: [String],
      required: true,
    },
  }
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
