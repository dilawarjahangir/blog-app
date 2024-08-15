import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

let MONGO_URI = process.env.DB_URL;

const connectDatabase = () => {
  mongoose
    .connect(MONGO_URI)
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1);
    });
};

export default connectDatabase;
