import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./hooks/index.jsx";
import { ProtectRoutes } from "./hooks/protectRoutes/index.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import PageNotFound from "./pages/PageNotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectRoutes />}>
            {/*Add protected routes here*/}
            {/*example: <Route path="/dashboard/" element={<Dashboard />} />*/}
          </Route>
          <Route path="*" element={PageNotFound} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
