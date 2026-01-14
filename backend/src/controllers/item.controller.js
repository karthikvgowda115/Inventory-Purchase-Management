import Item from "../models/Item.js";

// CREATE ITEM
export const createItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// GET ALL ITEMS
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// GET ITEM BY ID
export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// UPDATE ITEM
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// DELETE ITEM
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.destroy();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
