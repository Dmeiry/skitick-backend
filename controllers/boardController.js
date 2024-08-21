import Board from "../models/boardSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";
import STATUS_CODES from "../constants/statusCodes.js";

/**
 * 
 * @desc a function that finds all boards
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json containing all boards
 */
export const getAll = async (req, res, next) => {
    try {
        const result = await Board.find({});
        res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
        next(error);
    }
};

export const insert = async (req, res, next) => {
    try {
        const data = req.body;        
        const result = await Board.create(data);
        res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
        res.status(STATUS_CODE.UNPROCESSABLE).json(error);
    }
}
