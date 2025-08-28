import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("Express + Prisma + NeonDB Backend is working!");
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
