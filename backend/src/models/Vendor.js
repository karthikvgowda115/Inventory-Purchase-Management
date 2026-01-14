import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Vendor = sequelize.define("Vendor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Vendor name cannot be empty" }
    }
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Vendor contact cannot be empty" }
    }
  },
  address: {
    type: DataTypes.TEXT
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
});

export default Vendor;
