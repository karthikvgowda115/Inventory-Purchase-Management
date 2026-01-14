import Payment from "../models/Payment.js";
import Vendor from "../models/Vendor.js";
import sequelize from "../config/db.js";

// CREATE PAYMENT
export const createPayment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { vendorId, amount, mode, remarks } = req.body;

    // Validate vendor
    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    // Create Payment
    const payment = await Payment.create({ vendorId, amount, mode, remarks }, { transaction: t });

    // Update Vendor Balance
    vendor.balance = parseFloat(vendor.balance) - parseFloat(amount);
    await vendor.save({ transaction: t });

    await t.commit();
    res.status(201).json(payment);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// GET ALL PAYMENTS
export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      include: [Vendor],
      order: [["paymentDate", "DESC"]]
    });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};
