import Sticker from "../models/stickersSchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

/**
 * 
 * @desc a function that finds all users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json containing all users
 */
export const getAllStickers = async (req, res, next) => {
    try {
        const stickers = await Sticker.find({});
        res.status(STATUS_CODE.OK).json(stickers);
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
        const result = await Sticker.findById(id);

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
 * Create new Sticker in database
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
        const result = await Sticker.create(data);
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

        const updatedRecord = await Sticker.findByIdAndUpdate(id, data);

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
        const result = await Sticker.findByIdAndDelete(id);

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
