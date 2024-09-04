import Otp from "../models/otpSchema.js";
import { sendOtpSms } from "../util/otp.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};

export const registerUser = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);

  // Generate OTP
  const otp = generateOtp();

  // Save OTP to the database
  try {
    const newOtp = new Otp({
      otpnumber: otp.toString(),
      phone: phoneNumber,
      status: "pending",
    });
    await newOtp.save();

    // Send OTP to the user's phone number
    await sendOtpSms(phoneNumber, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send OTP or save OTP to database" });
  }
};
export const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Retrieve the latest OTP entry for the given phone number
    const otpRecord = await Otp.find({ phone: phoneNumber })
      .sort({ createdAt: -1 })
      .limit(1);

    if (otpRecord.length === 0) {
      return res.status(400).json({ error: "OTP not found" });
    }

    const latestOtp = otpRecord[0];

    // Check if the OTP matches and is not expired
    if (latestOtp.otpnumber === otp && latestOtp.status === "pending") {
      // Update OTP status to verified
      latestOtp.status = "verified";
      await latestOtp.save();

      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP or OTP has expired" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};
