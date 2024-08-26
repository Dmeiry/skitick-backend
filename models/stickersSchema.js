import { Schema, model } from "mongoose";

const stickersSchema = new Schema(
    {
     
        imagePath: {
            type: String,
        },
        status: {
            type: String,
            
        },
    },
    { timestamps: true }
);

const Sticker = model("stickers", stickersSchema, "stickers");

export default Sticker;
