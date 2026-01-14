import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Vendor from "./Vendor.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vendor,
      key: "id"
    }
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  mode: {
    type: DataTypes.ENUM("Cash", "Bank Transfer", "UPI"),
    allowNull: false
  },
  remarks: {
    type: DataTypes.TEXT
  }
});

Payment.belongsTo(Vendor, { foreignKey: "vendorId" });

export default Payment;
