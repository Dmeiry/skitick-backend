import Board from "../models/boardSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * Get the schema type based on question type
 *
 * @param {string} type - The type of the question
 * @returns {string} The schema type corresponding to the question type
 * @throws {Error} If the question type is invalid
 */
const getSchemaByType = (type) => {
  switch (type) {
    case "multipleChoiceSingle":
      return "multipleChoiceSingle";
    case "multipleChoiceMultiple":
      return "multipleChoiceMultiple";
    case "matching":
      return "matching";
    case "fillInTheBlank":
      return "fillInTheBlank";
    case "trueFalse":
      return "trueFalse";
    case "arrangeWords":
      return "arrangeWords";
    default:
      throw new Error("Invalid question type");
  }
};

/**
 * Create a new question and add it to a board
 *
 * @param {*} req - The request object containing boardId, type, and question data
 * @param {*} res - The response object
 * @returns {json} The created question or an error message
 */
export const createQuestion = async (req, res) => {
  const { type, boardId, ...data } = req.body;
  const schemaType = getSchemaByType(type);

  try {
    // Find the board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found" });
    }

    // Create the new question object
    const newQuestion = { type: schemaType, ...data };

    // Add the question to the board's questions array
    board.questions.push(newQuestion);
    await board.save();

    res.status(STATUS_CODE.CREATED).json(newQuestion);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

/**
 * Update an existing question in a board
 *
 * @param {*} req - The request object containing boardId, questionId, and updated question data
 * @param {*} res - The response object
 * @returns {json} The updated question or an error message
 */
export const updateQuestion = async (req, res) => {
  const { boardId, questionId } = req.body;
  const { type, ...data } = req.body;

  if (!boardId || !questionId) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: "Board ID and Question ID are required" });
  }

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found" });
    }

    const question = board.questions.id(questionId);
    if (!question) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Question not found" });
    }

    // Update the question with new data
    Object.assign(question, data);

    // Save the updated board
    await board.save();

    res.json(question);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

/**
 * Delete a question from a board
 *
 * @param {*} req - The request object containing boardId and questionId
 * @param {*} res - The response object
 * @returns {json} Success message or an error message
 */
export const deleteQuestion = async (req, res) => {
  const { boardId, questionId } = req.body;

  try {
    // Find the board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found" });
    }

    // Remove the question from the questions array
    const result = board.questions.id(questionId);
    if (!result) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Question not found" });
    }

    board.questions.pull(questionId); // Remove the question by its ID

    // Save the updated board
    await board.save();

    // Return a success message
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
