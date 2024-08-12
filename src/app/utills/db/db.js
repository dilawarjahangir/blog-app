import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
// Load environment variables from .env file
dotenv.config({ path: "config/.env" });
// console.log(process.env.MONGO_URI)
let MONGO_URI="mongodb+srv://dilawarjahangir2:2EheDME8nTwkjfbY@cluster0.gkq8g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

const connectDatabase = () => {
    mongoose.connect(MONGO_URI)
      .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
      })
      .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
      });
  };


export default connectDatabase