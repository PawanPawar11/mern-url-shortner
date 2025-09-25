import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },

    originalURL: {
      type: String,
      required: true,
    },

    visitTimeStamp: [
      {
        timestamp: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("Url", urlSchema);

export default URL;
