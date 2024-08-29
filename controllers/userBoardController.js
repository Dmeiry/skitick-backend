import User from "../models/userSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * @description Add board to user
 * @route   POST /api/users/addBoardToUser
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
      (board) => board.board.toString() === boardId
    );

    if (boardExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json({ message: "Board already added to the user" });
    }

    // Add the new board to the user's myBoards array
    user.myBoards.push({
      board: boardId,
      progress: 0, // Set initial progress to 0
      answers: new Map(), // Initialize with an empty Map for answers
    });

    // Save the updated user document
    await user.save();

    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error });
  }
};
