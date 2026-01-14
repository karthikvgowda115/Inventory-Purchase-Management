import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import GoodsReceipt from "./GoodsReceipt.js";
import Item from "./Item.js";

const GoodsReceiptItem = sequelize.define("GoodsReceiptItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  goodsReceiptId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

GoodsReceiptItem.belongsTo(GoodsReceipt, { foreignKey: "goodsReceiptId" });
GoodsReceiptItem.belongsTo(Item, { foreignKey: "itemId" });
GoodsReceipt.hasMany(GoodsReceiptItem, { foreignKey: "goodsReceiptId" });

export default GoodsReceiptItem;
