// models/question.js
import { Schema, model, SchemaTypes } from "mongoose";

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
  { discriminatorKey: "type", _id: false } // Discriminator key to differentiate question types
);

// Define schemas for specific question types

// Multiple Choice Question Schema (Single Choice)
const multipleChoiceSingleSchema = new Schema({
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
});

// Multiple Choice Question Schema (Multiple Choice)
const multipleChoiceMultipleSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswers: {
    type: [String], // Array for multiple correct answers
    required: true,
  },
});

// Matching Question Schema
const matchingQuestionSchema = new Schema({
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
});

// Fill in the Blank Question Schema
const fillInTheBlankQuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  blanks: [
    {
      placeholder: {
        type: String,
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
});

// True/False Question Schema
const trueFalseQuestionSchema = new Schema({
  statement: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: Boolean, // True or False
    required: true,
  },
});

// Arrange Words Question Schema
const arrangeWordsQuestionSchema = new Schema({
  //   text: {
  //     type: String,
  //     required: true,
  //   },
  words: {
    type: [String], // List of words to be arranged
    required: true,
  },
  //   correctOrder: {
  //     type: [String], // Correct order of words
  //     required: true,
  //   },
});

// Create models for each question type
const BaseQuestion = model("BaseQuestion", baseQuestionSchema);

const MultipleChoiceSingleQuestion = BaseQuestion.discriminator(
  "multipleChoiceSingle",
  multipleChoiceSingleSchema
);
const MultipleChoiceMultipleQuestion = BaseQuestion.discriminator(
  "multipleChoiceMultiple",
  multipleChoiceMultipleSchema
);
const MatchingQuestion = BaseQuestion.discriminator(
  "matching",
  matchingQuestionSchema
);
const FillInTheBlankQuestion = BaseQuestion.discriminator(
  "fillInTheBlank",
  fillInTheBlankQuestionSchema
);
const TrueFalseQuestion = BaseQuestion.discriminator(
  "trueFalse",
  trueFalseQuestionSchema
);
const ArrangeWordsQuestion = BaseQuestion.discriminator(
  "arrangeWords",
  arrangeWordsQuestionSchema
);

export {
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultipleQuestion,
  MatchingQuestion,
  FillInTheBlankQuestion,
  TrueFalseQuestion,
  ArrangeWordsQuestion,
};
