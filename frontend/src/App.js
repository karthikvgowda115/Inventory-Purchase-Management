import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./components/layout.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
