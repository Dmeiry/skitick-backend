import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {

        firstname: {
            type: String,
            required: [true, "firstname is required"],
            unique: false,
        },
        lastname: {
            type: String,
            required: [true, "lastname is required"],
            unique: false,
        },
        imageUrl: {
            type: String,

        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        currentBoard: {
            type: String,
        },
        class: {
            type: String,
        },
        phone: {
            type: String,
            validate: {
                validator: function (value) {
                    // Regular expression to validate phone address
                    const phoneRegex = /^\+?[1-9]\d{1,11}$/;
                    return phoneRegex.test(value);
                },
                message: "Invalid phone number",
            },

        }
    },
    { timestamps: true }
);

const User = model("user", userSchema);

export default User;