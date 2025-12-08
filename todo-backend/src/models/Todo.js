import { DataTypes } from "sequelize";
import { sequelize } from "./../database/sequelize.js"

const Todo = sequelize.define("Todo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: "PENDING" },
  dueDate: { type: DataTypes.DATE },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

export default Todo;
