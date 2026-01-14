export const validateVendor = (req, res, next) => {
  const { name, contact } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Vendor name is required" });
  }

  if (!contact || contact.trim() === "") {
    return res.status(400).json({ message: "Vendor contact is required" });
  }

  next();
};

export const validateItem = (req, res, next) => {
  const { name, sku, price } = req.body;

  if (!name || name.trim() === "")
    return res.status(400).json({ message: "Item name is required" });

  if (!sku || sku.trim() === "")
    return res.status(400).json({ message: "SKU is required" });

  if (price == null || isNaN(price) || Number(price) < 0)
    return res.status(400).json({ message: "Price must be a positive number" });

  next();
};

export const validatePurchaseOrder = (req, res, next) => {
  const { vendorId, items } = req.body;

  if (!vendorId) return res.status(400).json({ message: "Vendor is required" });

  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: "At least one item is required" });

  for (let i = 0; i < items.length; i++) {
    const { itemId, quantity, rate } = items[i];
    if (!itemId || quantity <= 0 || rate <= 0)
      return res.status(400).json({
        message: "ItemId, positive quantity, and rate are required for each item"
      });
  }

  next();
};

export const validateGoodsReceipt = (req, res, next) => {
  const { purchaseOrderId, items } = req.body;

  if (!purchaseOrderId) return res.status(400).json({ message: "PO ID is required" });

  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: "At least one item must be received" });

  for (let i = 0; i < items.length; i++) {
    const { itemId, quantity } = items[i];
    if (!itemId || quantity <= 0)
      return res.status(400).json({ message: "ItemId and positive quantity are required" });
  }

  next();
};

export const validatePayment = (req, res, next) => {
  const { vendorId, amount, mode } = req.body;

  if (!vendorId) return res.status(400).json({ message: "Vendor is required" });
  if (amount == null || isNaN(amount) || amount <= 0)
    return res.status(400).json({ message: "Amount must be positive" });
  if (!mode || !["Cash", "Bank Transfer", "UPI"].includes(mode))
    return res.status(400).json({ message: "Valid payment mode is required" });

  next();
};


