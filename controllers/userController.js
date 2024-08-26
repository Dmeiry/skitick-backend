import User from "../models/userSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * @description Get all users
 * @route   GET /api/users/getAll
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
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

/**
 * @description Get user by id
 * @route   GET /api/users/getUserById/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 * @returns json containing user
 */
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(STATUS_CODE.OK).json(user);
    }
    catch (error) {
        next(error);
    }
}

/**
 * @description Create user
 * @route   POST /api/users/createUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 * @returns json containing user
 */
export const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body, {
            runValidators: true,
        });
        res.status(STATUS_CODE.CREATED).json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * @description Update user
 * @route   PUT /api/users/updateUser/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 * @returns json containing updated user
 */
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(STATUS_CODE.OK).json(user);
    }
    catch (error) {
        next(error);
    }
}

/**
 * @description Delete user
 * @route   DELETE /api/users/deleteUser/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 * @returns json containing message
 */
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(STATUS_CODE.NO_CONTENT).json({ message: "User deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}