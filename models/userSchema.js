import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {

        phone: {
            type: String,
            validate: {
                validator: function (value) {
                    // Regular expression to validate phone number
                    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                    return phoneRegex.test(value);
                },
                message: "Invalid phone number",
            },
        },
        auth: {
            type: Boolean,
            required: true,
        },
        class: {
            type: String,
        },
        currentBoard: {
            type: String,
        },
        firstname: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        lastname: {
            type: String,
            required: true,
        },
        myBoards: {
            type: [String],
            default: [],
        },
        myStickers: {
            type: [String],
            default: [],
        },
        score: {
            type: Number,
        },
        status: {
            type: String,
            default: 1,
        },
    },
    { timestamps: true }
);

const User = model("user", userSchema, "users");

export default User;
