import { DataTypes } from "sequelize";
// import sequelize from "../database/sequelize.js";
import { sequelize } from "./../database/sequelize.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

export default User;
