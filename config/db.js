import mongoose from "mongoose";

const devMode = process.env.MODE || "prod";
let connectDB;

if (devMode == "dev") {
  connectDB = async () => {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected : ${db.connection.host}`);
    } catch (error) {
      console.error(error);
    }
  };
} else {


}

export default connectDB;
