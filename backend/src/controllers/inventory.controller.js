import Inventory from "../models/Inventory.js";
import Item from "../models/Item.js";

// GET ALL INVENTORY
export const getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findAll({
      include: [{ model: Item }],
      order: [["updatedAt", "DESC"]]
    });
    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

// GET INVENTORY BY ITEM ID
export const getInventoryByItem = async (req, res, next) => {
  try {
    const inventory = await Inventory.findOne({
      where: { itemId: req.params.itemId },
      include: [{ model: Item }]
    });

    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });

    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

// ADJUST INVENTORY (manual correction)
export const adjustInventory = async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body;

    let inventory = await Inventory.findOne({ where: { itemId } });

    if (!inventory) {
      inventory = await Inventory.create({ itemId, quantity });
    } else {
      inventory.quantity = quantity;
      await inventory.save();
    }

    res.json(inventory);
  } catch (error) {
    next(error);
  }
};
