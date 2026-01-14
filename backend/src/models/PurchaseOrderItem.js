import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import PurchaseOrder from "./PurchaseOrder.js";
import Item from "./Item.js";

const PurchaseOrderItem = sequelize.define("PurchaseOrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  purchaseOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: PurchaseOrder, key: "id" }
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Item, key: "id" }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  rate: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false
  }
});

// Associations
PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: "purchaseOrderId" });
PurchaseOrderItem.belongsTo(Item, { foreignKey: "itemId" });
PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: "purchaseOrderId" });

export default PurchaseOrderItem;
