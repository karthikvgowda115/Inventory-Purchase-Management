import express from "express";
import cors from "cors";
import vendorRoutes from "./routes/vendor.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import itemRoutes from "./routes/item.routes.js";
import purchaseOrderRoutes from "./routes/purchaseOrder.routes.js";
import goodsReceiptRoutes from "./routes/goodsReceipt.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";







const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vendors", vendorRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/goods-receipt", goodsReceiptRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/inventory", inventoryRoutes);


app.use(errorMiddleware);

export default app;
