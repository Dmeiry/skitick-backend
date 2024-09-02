import User from "../models/userSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * @description Submit answers to a board
 * @route   POST /api/questions/submitAnswers
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns json containing updated user answers
 */
export const submitAnswers = async (req, res) => {
  const { userId, boardId, questionId, answers } = req.body; // Assuming answers is an object with answers for the specific question

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Find the board within the user's boards
    const board = user.myBoards.id(boardId);

    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found in user's boards" });
    }

    // Find the specific question in the board's questions
    const question = board.questions.id(questionId);

    if (!question) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Question not found in the board" });
    }

    // Assign the user's answer to the question
    question.userAnswer = answers;

    // Save the updated user document
    await user.save();

    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error });
  }
};
