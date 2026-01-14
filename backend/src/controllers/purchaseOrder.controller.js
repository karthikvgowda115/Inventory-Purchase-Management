import PurchaseOrder from "../models/PurchaseOrder.js";
import PurchaseOrderItem from "../models/PurchaseOrderItem.js";
import Vendor from "../models/Vendor.js";
import Item from "../models/Item.js";

// CREATE PO
export const createPurchaseOrder = async (req, res, next) => {
  const t = await PurchaseOrder.sequelize.transaction();
  try {
    const { vendorId, items } = req.body;
    if (!vendorId || !items || items.length === 0)
      return res.status(400).json({ message: "Vendor and items required" });

    let totalAmount = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

    const po = await PurchaseOrder.create({ vendorId, totalAmount }, { transaction: t });

    for (let i of items) {
      if (!i.itemId || i.quantity <= 0 || i.rate <= 0)
        throw new Error("ItemId, positive quantity, and rate are required");
      await PurchaseOrderItem.create({
        purchaseOrderId: po.id,
        itemId: i.itemId,
        quantity: i.quantity,
        rate: i.rate,
        amount: i.quantity * i.rate
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json(po);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// GET POs WITH ITEMS & VENDOR
export const getPurchaseOrders = async (req, res, next) => {
  try {
    const pos = await PurchaseOrder.findAll({
      include: [
        { model: PurchaseOrderItem, include: [Item] },
        { model: Vendor }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.json(pos);
  } catch (error) {
    next(error);
  }
};

// APPROVE PO
export const approvePurchaseOrder = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findByPk(req.params.id);
    if (!po) return res.status(404).json({ message: "PO not found" });
    po.status = "Approved";
    await po.save();
    res.json(po);
  } catch (error) {
    next(error);
  }
};

// DELETE PO
export const deletePurchaseOrder = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findByPk(req.params.id);
    if (!po) return res.status(404).json({ message: "PO not found" });
    await po.destroy();
    res.json({ message: "PO deleted successfully" });
  } catch (error) {
    next(error);
  }
};
