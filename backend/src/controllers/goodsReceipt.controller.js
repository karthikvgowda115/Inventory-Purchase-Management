import GoodsReceipt from "../models/GoodsReceipt.js";
import GoodsReceiptItem from "../models/GoodsReceiptItem.js";
import PurchaseOrder from "../models/PurchaseOrder.js";
import PurchaseOrderItem from "../models/PurchaseOrderItem.js";
import Inventory from "../models/Inventory.js";
import sequelize from "../config/db.js";

// CREATE GRN
export const createGoodsReceipt = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { purchaseOrderId, items } = req.body;

    const po = await PurchaseOrder.findByPk(purchaseOrderId, {
      include: [PurchaseOrderItem]
    });

    if (!po) return res.status(404).json({ message: "PO not found" });
    if (po.status !== "Approved")
      return res.status(400).json({ message: "PO not approved" });

    const grn = await GoodsReceipt.create(
      { purchaseOrderId },
      { transaction: t }
    );

    // Save received items & update inventory
    for (const item of items) {
      await GoodsReceiptItem.create(
        {
          goodsReceiptId: grn.id,
          itemId: item.itemId,
          quantity: item.quantity
        },
        { transaction: t }
      );

      const inventory = await Inventory.findOne({
        where: { itemId: item.itemId }
      });

      if (inventory) {
        inventory.quantity += item.quantity;
        await inventory.save({ transaction: t });
      } else {
        await Inventory.create(
          { itemId: item.itemId, quantity: item.quantity },
          { transaction: t }
        );
      }
    }

    // Check PO completion
    let fullyReceived = true;
    for (const poItem of po.PurchaseOrderItems) {
      const received = items.find(i => i.itemId === poItem.itemId);
      if (!received || received.quantity < poItem.quantity) {
        fullyReceived = false;
        break;
      }
    }

    po.status = fullyReceived ? "Completed" : "Approved";
    await po.save({ transaction: t });

    await t.commit();
    res.status(201).json({ message: "GRN created", grnId: grn.id });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// GET ALL GRNs
export const getGoodsReceipts = async (req, res, next) => {
  try {
    const grns = await GoodsReceipt.findAll({
      include: [GoodsReceiptItem, PurchaseOrder],
      order: [["createdAt", "DESC"]]
    });
    res.json(grns);
  } catch (error) {
    next(error);
  }
};
