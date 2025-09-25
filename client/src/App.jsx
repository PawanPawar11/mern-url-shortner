import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* index prop means this is the default child route. It's the component
        that will be rendered inside the parent's <Outlet /> when the URL
        exactly matches the parent's path. */}
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}
