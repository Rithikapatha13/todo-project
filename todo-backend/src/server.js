import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import { sequelize } from "./database/sequelize.js";
import { Todo } from "./models/Todo.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// main todo routes
app.use("/api", todoRoutes);
sequelize.sync().then(() => {
  console.log("Database synced");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
