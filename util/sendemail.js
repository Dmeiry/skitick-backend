import nodemailer from "nodemailer";

export async function sendOtpEmail(to, otpNumber) {
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email options with improved HTML styling
    let mailOptions = {
      from: '"Your Company Name" <your-email@gmail.com>', // Sender address
      to: to, // Recipient's email
      subject: "Your OTP Code", // Subject line
      text: `Your OTP code is ${otpNumber}.`, // Plain text body
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 600px; margin: 20px auto; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #0044cc;">Your OTP Code</h2>
          <p style="font-size: 16px; color: #555;">Use the following One-Time Password to complete your transaction. This code is valid for a limited time.</p>
          <div style="font-size: 22px; font-weight: bold; color: #333; margin: 20px 0; padding: 15px; background-color: #f9f9f9; border: 1px dashed #ccc; border-radius: 5px;">
            ${otpNumber}
          </div>
          <p style="font-size: 14px; color: #999;">If you didn’t request this code, please ignore this email.</p>
          <div style="margin-top: 30px; font-size: 12px; color: #aaa;">
            <p>Thank you,</p>
            <p>Your Company Name</p>
          </div>
        </div>
      </div>`,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent: " + info.response);
  } catch (error) {
    console.log("Error sending OTP email:", error);
  }
}
