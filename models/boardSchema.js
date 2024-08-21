import { Schema, model } from "mongoose";

const boardSchema = new Schema(
    {
        album: {
            type: String,
            required: true,
        },
        numOfQuestions: {
            type: Number,
            required: true,
        },
        questions: {
            type: Array,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        minscore: {
            type: Number,
            required: true,
        },
        numoftries: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        backgroundImageUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        numofstickers: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Board = model("board", boardSchema, "board");

export default Board;
