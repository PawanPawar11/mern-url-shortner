import mongoose from "mongoose";

export const connectToDB = async (url) => {
  try {
    const connected = await mongoose.connect(url);
    console.log("MongoDB connected successfully! 🎉");
  } catch (error) {
    console.log(
      "Error occurred while connecting with mongoDB: ",
      error.message
    );
  }
};
