import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import PurchaseOrder from "./PurchaseOrder.js";

const GoodsReceipt = sequelize.define("GoodsReceipt", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  purchaseOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("Partial", "Completed"),
    defaultValue: "Partial"
  },
  receivedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

GoodsReceipt.belongsTo(PurchaseOrder, { foreignKey: "purchaseOrderId" });

export default GoodsReceipt;
