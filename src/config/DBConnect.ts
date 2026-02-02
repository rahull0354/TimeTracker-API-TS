import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(error);
  }
};

export default DBConnect;
