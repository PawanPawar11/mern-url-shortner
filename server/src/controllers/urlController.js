import URL from "../models/urlModel.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    let { url } = req.body;

    if (!url) {
      res.status(400).json({ message: "URL is required! 😟" });
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    const shortURL = nanoid(8);

    const newURL = await URL.create({
      originalURL: url,
      shortURL: shortURL,
      visitTimeStamp: [{ timestamp: new Date() }],
    });

    res
      .status(201)
      .json({ message: "New Short URL Generated! 🥳", data: newURL });
  } catch (error) {
    console.log("Error occurred while creating shortURL: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const resolveShortUrl = async (req, res) => {
  try {
    const { shorturl } = req.params;

    if (!shorturl) {
      return res.status(400).json({ message: "Short URL not provided! 😟" });
    }

    const result = await URL.findOneAndUpdate(
      { shortURL: shorturl },
      { $push: { visitTimeStamp: { timestamp: new Date() } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Invalid short URL! 😔" });
    }

    res.redirect(result.originalURL);
  } catch (error) {
    console.log("Error occurred while resolving short URL: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { shorturl } = req.params;

    if (!shorturl) {
      return res.status(400).json({ message: "Short URL not provided! 😟" });
    }

    const result = await URL.findOne({ shortURL: shorturl });

    if (!result) {
      return res.status(404).json({ message: "Invalid short URL! 😔" });
    }

    res.status(200).json({
      totalClicks: result.visitTimeStamp.length,
      originalURL: result.originalURL,
      shortURL: result.shortURL,
      analytics: result.visitTimeStamp,
    });
  } catch (error) {
    console.log("Error occurred while getting analytics: ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
