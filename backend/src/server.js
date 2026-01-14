import app from "./app.js";
import sequelize from "./config/db.js";
import { ENV } from "./config/env.js";

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync();
    console.log("✅ Models synced");

    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed:", error);
  }
}

startServer();
