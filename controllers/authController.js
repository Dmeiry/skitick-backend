import mongoose from "mongoose";
import Otp from "../models/otpSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import { sendOtpEmail } from "../util/sendemail.js"; // Assuming sendOtpEmail is in the util/sendemail.js file

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};

export const registerUser = async (req, res) => {
  const { email } = req.body; // Only email is used now
  // Generate OTP
  const otp = generateOtp();

  try {
    // Create a dummy user
    const newUser = new User({
      email,
      auth: false, // Default authentication status
      // Include other necessary fields if required
    });
    const savedUser = await newUser.save();

    // Save OTP to the database with the user's ID
    const newOtp = new Otp({
      otpnumber: otp.toString(),
      email: email, // Using email as the identifier
      user_id: savedUser._id, // Add user ID reference
      status: "pending",
    });
    await newOtp.save();

    // Send OTP via email
    await sendOtpEmail(email, otp); // Sending OTP via email
    res.status(200).json({ message: "OTP sent successfully via email" });
  } catch (error) {
    console.error("Error in OTP process:", error); // Log error for debugging
    res.status(500).json({
      error: "Failed to send OTP or save OTP to database",
      details: error.message, // Include detailed error message
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body; // Only email and otp are used

  try {
    // Retrieve the latest OTP entry for the given email
    const otpRecord = await Otp.findOne({ email: email }).sort({
      createdAt: -1,
    });

    if (!otpRecord) {
      return res.status(400).json({ error: "OTP not found" });
    }

    // Check if the OTP matches and is not expired
    if (otpRecord.otpnumber === otp && otpRecord.status === "pending") {
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

      res
        .status(200)
        .json({ message: "OTP verified successfully and user authenticated" });
    } else {
      res.status(400).json({ error: "Invalid OTP or OTP has expired" });
    }
  } catch (error) {
    console.error("Error in OTP verification:", error); // Log error for debugging
    res
      .status(500)
      .json({ error: "Failed to verify OTP", details: error.message });
  }
};
