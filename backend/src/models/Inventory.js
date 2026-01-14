import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Item from "./Item.js";

const Inventory = sequelize.define("Inventory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
});

Inventory.belongsTo(Item, { foreignKey: "itemId" });

export default Inventory;
