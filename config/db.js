import mongoose from "mongoose";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

const getSecretValue = async (secretName) => {
    const [version] = await client.accessSecretVersion({
        name: `projects/1027309556923/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString("utf8");
};

const connectDB = async () => {
    try {
        const mongoURI = await getSecretValue("MONGO_URI"); // Using "MONGO_URI" as the secret name
        const db = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;

// all below is the oldest , depends on .env file 

// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         const db = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected : ${db.connection.host}`);
//     } catch (error) {
//         console.error(error);
//     }
// };

// export default connectDB;