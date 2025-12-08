import express from "express";
import cors from "cors";
import { sequelize } from "./database/sequelize.js";
import Todo from "./models/Todo.js";
import User from "./models/UserModel.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());


User.hasMany(Todo);
Todo.belongsTo(User);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(5000, () => console.log("Server running on 5000"));
});
