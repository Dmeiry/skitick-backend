import { Schema, model } from "mongoose";
// set status [1:active, 0:inactive , 5:deleted]
const stickersSchema = new Schema(
    {
     
        imagePath: {
            type: String,
        },
        status: {
            type: String,
            default: 1,            
        },
    },
    { timestamps: true }
);

const Sticker = model("stickers", stickersSchema, "stickers");

export default Sticker;
