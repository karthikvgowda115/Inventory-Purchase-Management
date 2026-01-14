import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Vendor from "./Vendor.js";

const PurchaseOrder = sequelize.define("PurchaseOrder", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Vendor, key: "id" }
  },
  status: {
    type: DataTypes.ENUM("Draft", "Approved", "Completed"),
    defaultValue: "Draft"
  },
  totalAmount: {
    type: DataTypes.DECIMAL(12,2),
    defaultValue: 0
  }
});

PurchaseOrder.belongsTo(Vendor, { foreignKey: "vendorId" });
export default PurchaseOrder;
