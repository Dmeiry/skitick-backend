import { Schema } from "mongoose";
import {
  baseQuestionSchema,
  multipleChoiceSingleSchema,
  multipleChoiceMultipleSchema,
  matchingQuestionSchema,
  fillInTheBlankQuestionSchema,
  trueFalseQuestionSchema,
  arrangeWordsQuestionSchema,
} from "./questionWithAnswersShema.js"; // Import the updated questions schema
import { boardSchema as originalBoardSchema } from "./boardSchema.js";

// Extend the original board schema with the overridden 'questions' field and additional 'progress' field
const boardSchema = new Schema(
  {
    ...originalBoardSchema.obj, // Spread the fields from the original schema
    questions: {
      type: [baseQuestionSchema], // Override 'questions' with the updated questions schema
      required: true,
    },
    progress: {
      type: Number, // Assuming progress is a number (e.g., percentage)
      default: 0, // Set a default value if desired
    },
  },
  { timestamps: true }
);

// Apply the discriminators for the updated question types
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

export default boardSchema;
