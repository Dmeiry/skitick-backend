import User from "../models/userSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * @description Add a question to user's board
 * @route   POST /api/userboard/addQuestionToBoard
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns json containing updated user
 */
export const addQuestionToBoard = async (req, res) => {
  const { userId, boardId, questionId, answer } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Find the board within the user's myBoards array
    const board = user.myBoards.find(
      (board) => board.board.toString() === boardId
    );

    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found in user's boards" });
    }

    // Add or update the question in the answers map
    board.answers.set(questionId, answer);

    // Save the updated user document
    await user.save();

    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error });
  }
};

/**
 * @description Get user answers for a specific board
 * @route   GET /api/userboard/getBoardAnswers
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns json containing user's answers for the board
 */
export const getBoardAnswers = async (req, res) => {
  const { userId, boardId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Find the board within the user's myBoards array
    const board = user.myBoards.find(
      (board) => board.board.toString() === boardId
    );

    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found in user's boards" });
    }

    // Return the answers for the board
    res.status(STATUS_CODE.OK).json({ answers: board.answers });
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error });
  }
};
