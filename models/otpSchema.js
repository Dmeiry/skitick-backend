import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otpnumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      required: true, // Make phone required if needed
    }, 
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "expired"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
