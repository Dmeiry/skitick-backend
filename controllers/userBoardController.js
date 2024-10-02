import User from "../models/userSchema.js";
import Board from "../models/boardSchema.js"; // Import the Board model to find the board
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * @description Add board to user
 * @route   http://localhost:3000/api/userboard/addBoardToUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns json containing updated user
 */

export const addBoardToUser = async (req, res) => {
  const { userId, boardId } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Check if the board is already associated with the user
    const boardExists = user.myBoards.some(
      (board) => board._id.toString() === boardId
    );

    if (boardExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json({ message: "Board already added to the user" });
    }

    // Find the board by ID
    const board = await Board.findById(boardId);

    if (!board) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found" });
    }

    // Create a new board instance using the boardUserSchema
    const userBoard = {
      ...board.toObject(), // Copy the board into the user's schema
      progress: 0, // Set initial progress to 0
    };
    // Add the new board to the user's myBoards array
    user.myBoards.push(userBoard);

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
 * @description Delete board from user
 * @route   DELETE http://localhost:3000/api/userboard/deleteBoardFromUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns json containing updated user
 */
export const deleteBoardFromUser = async (req, res) => {
  const { userId, boardId } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Check if the board is associated with the user
    const boardIndex = user.myBoards.findIndex(
      (board) => board._id.toString() === boardId
    );

    if (boardIndex === -1) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: "Board not found in user's boards" });
    }

    // Remove the board from the user's myBoards array
    user.myBoards.splice(boardIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error });
  }
};