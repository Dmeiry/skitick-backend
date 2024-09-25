import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendOtpSms = async (phoneNumber, messageBody) => {
  try {
    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log("SMS sent successfully:", message.sid);
    return message.sid;
  } catch (error) {
    // Print the full error object for debugging
    console.error("Failed to send SMS:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
    }
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};
