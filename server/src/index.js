import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { connectToDB } from "./config/db.js";
import router from "./routes/urlRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8001; // the order of the environment variables also matters a lot, earlier I had this line at top, even
// before express and because of having dotenv.config() function below the process.env.PORT number I was not able to read my port 5001, and it
// was running on 5001. It was very hard to catch this issue on production though, it was my luck that I found it this early because I was
// just checking out if everything is working fine on development side. And it turns out the postman was throwing error and when I opened
// the log on vs code that's when I finally understood the issue!
app.use(cors());
app.use(express.json());
connectToDB(process.env.MONGO_URI);

app.use("/api", router);

app.use("/api", router);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}! 💡`);
});
