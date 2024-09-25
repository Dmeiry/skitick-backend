import Board from "../models/boardSchema.js";
import STATUS_CODE, { RECORD_STATUS } from "../constants/statusCodes.js";

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
    const { id } = req.params;
    const data = req.body;

    // Use $set to update only specified fields
    const updatedRecord = await Board.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true } 
    );

    if (!updatedRecord) {
      return res.status(STATUS_CODE.NOT_FOUND).send("Record not found");
    }

    res.send(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(STATUS_CODE.BAD_REQUEST).json(error);
  }
};

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

      // update the document's status to 2 (delete)
      const result = await Board.findByIdAndUpdate(
        id,
        { status: RECORD_STATUS.DELETED }, // Set status to 2 for soft delete
        { new: true } // Return the updated document
      );

      // document not found. return not found response error
      if (!result) {
        return res.status(STATUS_CODE.NOT_FOUND).send("Document not found");
      }

      res.send(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}



/**
 * Undelete a soft-deleted document by setting its status to active
 * 
 * @param {*} req 
 * @param {*} res
 * @returns {json} document data
 */
export const undeleteById = async (req, res) => {
    try {
        // get id from request
        const { id } = req.params;

        const result = await Board.findByIdAndUpdate(
          id,
          { status: RECORD_STATUS.ACTIVE },
          { new: true } // Return the updated document
        );

        // document not found. return not found response error
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).send("Document not found");
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}



/**
 * Set a document's status to active (1)
 * 
 * @param {*} req 
 * @param {*} res
 * @returns {json} document data
 */
export const setActive = async (req, res) => {
    try {
        // get id from request
        const { id } = req.params;

        // update the document's status to 1 (active)
        const result = await Board.findByIdAndUpdate(
          id,
          { status: RECORD_STATUS.ACTIVE }, // Set status to 1 for active
          { new: true } // Return the updated document
        );

        // document not found. return not found response error
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).send("Document not found");
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}

/**
 * Set a document's status to inactive (0)
 * 
 * @param {*} req 
 * @param {*} res
 * @returns {json} document data
 */
export const setInactive = async (req, res) => {
    try {
        // get id from request
        const { id } = req.params;

        // update the document's status to 0 (inactive)
        const result = await Board.findByIdAndUpdate(
          id,
          { status: RECORD_STATUS.INACTIVE }, // Set status to 0 for inactive
          { new: true } // Return the updated document
        );

        // document not found. return not found response error
        if (!result) {
            return res.status(STATUS_CODE.NOT_FOUND).send("Document not found");
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.BAD_REQUEST).json(error);
    }
}

