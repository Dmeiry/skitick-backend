import { Schema, model } from "mongoose";
// set status [0:active, 1:inactive , 2:deleted]
const stickersSchema = new Schema(
    {
     
        imagePath: {
            type: String,
        },
        status: {
            type: String,
            default: 0,            
        },
    },
    { timestamps: true }
);

const Sticker = model("stickers", stickersSchema, "stickers");

export default Sticker;
