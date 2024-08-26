import Board from "../models/boardSchema.js";

import {
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultipleQuestion,
  MatchingQuestion,
  FillInTheBlankQuestion,
  TrueFalseQuestion,
  ArrangeWordsQuestion,
} from "../models/question.js";

// Utility function to get the correct model based on question type
const getModelByType = (type) => {
  switch (type) {
    case "multipleChoiceSingle":
      return MultipleChoiceSingleQuestion;
    case "multipleChoiceMultiple":
      return MultipleChoiceMultipleQuestion;
    case "matching":
      return MatchingQuestion;
    case "fillInTheBlank":
      return FillInTheBlankQuestion;
    case "trueFalse":
      return TrueFalseQuestion;
    case "arrangeWords":
      return ArrangeWordsQuestion;
    default:
      throw new Error("Invalid question type");
  }
};

export const createQuestion = async (req, res) => {
  const { type, boardId, ...data } = req.body;
  const Model = getModelByType(type);

  try {
    // Find the board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Create the new question
    const newQuestion = new Model(data);
    await newQuestion.save();

    // Add the question to the board's questions array
    board.questions.push(newQuestion._id);
    await board.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Promise.all([
      MultipleChoiceSingleQuestion.find(),
      MultipleChoiceMultipleQuestion.find(),
      MatchingQuestion.find(),
      FillInTheBlankQuestion.find(),
      TrueFalseQuestion.find(),
      ArrangeWordsQuestion.find(),
    ]);

    // Flatten the array of arrays into a single array of questions
    const allQuestions = questions.flat();
    res.json(allQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a question by ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // Assuming the type is passed as a query parameter

  try {
    const Model = getModelByType(type);
    const question = await Model.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { type, ...data } = req.body;

  try {
    const Model = getModelByType(type);
    const updatedQuestion = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // Assuming the type is passed as a query parameter

  try {
    const Model = getModelByType(type);
    const deletedQuestion = await Model.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
