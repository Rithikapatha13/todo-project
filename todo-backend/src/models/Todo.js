import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Todo = sequelize.define("Todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING",
  },
  dueDate: {
    type: DataTypes.DATE,
  },
});
