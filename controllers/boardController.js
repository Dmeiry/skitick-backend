import Board from "../models/boardSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

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

/**
 * Find document using id
 * 
 * @param {*} req 
 * @param {*} res
 * @returns {json} document data
 */
export const getById = async (req, res) => {
    try {
        // get id from request
        const { id } = req.params;

        // update document data
        const result = await Board.findById(id);

        // document not found. return not found response error
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).send('Document not found');
        }
        
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}

/**
 * Create new board in database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * 
 * @returns {json} created object instance or error response
 */
export const insert = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Board.create(data);
        res.status(STATUS_CODE.CREATED).json(result);
    } catch (error) {
        res.status(STATUS_CODE.UNPROCESSABLE).json(error);
    }
}

/**
 * Update existing document data
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @return {json} old document data | Error
 */
export const update = async (req, res) => {
    try {
        // get document id and new data from request
        const { id } = req.params;
        const data = req.body;

        const updatedRecord = await Board.findByIdAndUpdate(id, data);

        // document not found. return not found response error
        if (!updatedRecord) {
            return res.status(STATUS_CODE.NOT_FOUND).send('Record not found');
        }
        
        res.send(updatedRecord);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}

/**
 * Delete document using id
 * 
 * @param {*} req 
 * @param {*} res
 * @returns {json} document data
 */
export const deleteById = async (req, res) => {
    try {
        // get id from request
        const { id } = req.params;

        // delete document
        const result = await Board.findByIdAndDelete(id);

        // document not found. return not found response error
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).send('Document not found');
        }
        
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}
