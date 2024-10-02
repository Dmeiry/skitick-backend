import jwt from "jsonwebtoken";
import Otp from "../models/otpSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import { sendOtpSms } from "../util/otp.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};

export const registerUser = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOtp(); // Assuming you have a generateOtp function

  try {
    // Check if the user already exists
    let user = await User.findOne({ phone: phoneNumber });

    if (!user) {
      // Create a new user if it doesn't exist
      user = new User({
        phone: phoneNumber,
        auth: false,
      });
      await user.save();
    }

    // Check if an OTP exists for the user
    let existingOtp = await Otp.findOne({ phone: phoneNumber });

    if (existingOtp) {
      // Update the existing OTP with the new OTP value
      existingOtp.otpnumber = otp.toString();
      existingOtp.status = "pending";
      existingOtp.updatedAt = new Date(); // Update the timestamp (assuming you have a timestamp field)
      await existingOtp.save();
    } else {
      // Create a new OTP if it doesn't exist
      const newOtp = new Otp({
        otpnumber: otp.toString(),
        phone: phoneNumber,
        user_id: user._id,
        status: "pending",
      });
      await newOtp.save();
    }

    // Send the OTP via SMS
    await sendOtpSms(phoneNumber, otp);

    res.status(200).json({ message: "OTP sent successfully via SMS" });
  } catch (error) {
    console.error("Error in OTP process:", error);
    res.status(500).json({
      error: "Failed to send OTP or save OTP to the database.",
      details: error.message,
    });
  }
};



export const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Retrieve the latest OTP entry for the given phone number
    const otpRecord = await Otp.findOne({ phone: phoneNumber }).sort({
      createdAt: -1,
    });

    if (!otpRecord) {
      return res.status(400).json({ error: "OTP not found" });
    }

    // Check if the OTP matches and is not expired
    const now = new Date();
    const otpCreatedAt = new Date(otpRecord.updatedAt);
    const expirationPeriod = 60 * 60 * 1000; // Example: 10 minutes expiration time
    const isExpired = now - otpCreatedAt > expirationPeriod;
    if (
      otpRecord.otpnumber === otp &&
      otpRecord.status === "pending" &&
      !isExpired
    ) {
      // Update OTP status to verified
      otpRecord.status = "verified";
      await otpRecord.save();

      // Fetch user by the ID from the OTP record
      const user = await User.findById(otpRecord.user_id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user auth status
      user.auth = true; // Set auth to true
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id, // Use relevant user data for the token
          phoneNumber: user.phoneNumber, // You can include other data if necessary
        },
        process.env.JWT_SECRET
      );

      // Send token and user data in response
      res.status(200).json({
        message: "OTP verified successfully and user authenticated",
        token, // Send the token
        user,
      });
    } else {
      const errorMessage = isExpired ? "OTP has expired" : "Invalid OTP";
      res.status(400).json({ error: errorMessage });
    }
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res
      .status(500)
      .json({ error: "Failed to verify OTP", details: error.message });
  }
};
