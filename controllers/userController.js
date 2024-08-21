import User from "../models/userSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * 
 * @desc a function that finds all users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json containing all users
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find({});
        res.status(STATUS_CODE.OK).json(user);
    } catch (error) {
        next(error);
    }
};
