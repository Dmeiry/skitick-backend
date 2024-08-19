import User from "../models/userSchema.js";

export const getAllUsers = async (req, res, next) => {
    try {
        // const users = await User.find({});
        console.log('users: ');
        res.send("okay")
        // res.status(STATUS_CODE.OK).json(users);
    } catch (error) {
        next(error);
    }
};


