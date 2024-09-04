import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otpnumber: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
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
