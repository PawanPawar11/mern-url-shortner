import React from "react";
import { NavLink, Outlet } from "react-router";

export default function Layout() {
  const activeLinkStyle = {
    backgroundColor: "#0891b2", // bg-cyan-600
    color: "white",
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col items-center justify-center p-4 relative">
      <nav className="absolute top-0 left-0 right-0 p-4 flex justify-center space-x-4 bg-slate-900/50 backdrop-blur-sm">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="px-4 py-2 rounded-md transition-colors font-semibold bg-slate-700 hover:bg-slate-600"
        >
          Shorten URL
        </NavLink>
        <NavLink
          to="/analytics"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="px-4 py-2 rounded-md transition-colors font-semibold bg-slate-700 hover:bg-slate-600"
        >
          View Analytics
        </NavLink>
      </nav>

      <main className="w-full max-w-lg">
        {/* The child route component (HomePage or AnalyticsPage) will be rendered here */}
        <Outlet />
      </main>

      <footer className="absolute bottom-4 text-slate-500 text-sm">
        Created for your URL shortening needs.
      </footer>
    </div>
  );
}
