import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { connectToDB } from "./config/db.js";
import router from "./routes/urlRoutes.js";
import cors from "cors";

const PORT = process.env.PORT || 8001;
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectToDB(process.env.MONGO_URI);

app.use("/api", router);

app.use("/api", router);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}! 💡`);
});
