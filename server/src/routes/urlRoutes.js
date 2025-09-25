import express from "express";
import {
  createShortUrl,
  getAnalytics,
  resolveShortUrl,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shorturl", resolveShortUrl);
router.get("/analysis/:shorturl", getAnalytics);

export default router;
