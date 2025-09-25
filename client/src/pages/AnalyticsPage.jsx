import React, { useState } from "react";

// Base URL for your backend API.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AnalyticsPage() {
  const [shortUrlInput, setShortUrlInput] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchAnalytics = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalytics(null);

    if (!shortUrlInput) {
      setError("Please enter a short URL's ID.");
      setLoading(false);
      return;
    }

    // Extract just the ID if a full URL is pasted
    const urlId = shortUrlInput.split("/").pop();

    try {
      const response = await fetch(`${API_BASE_URL}/analysis/${urlId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch analytics.");
      }

      setAnalytics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl transition-all">
      <h1 className="text-3xl font-bold text-center mb-2 text-cyan-400">
        URL Analytics
      </h1>
      <p className="text-slate-400 text-center mb-6">
        Enter a short URL ID to see its stats.
      </p>

      <form onSubmit={handleFetchAnalytics} className="space-y-4">
        <input
          type="text"
          value={shortUrlInput}
          onChange={(e) => setShortUrlInput(e.target.value)}
          placeholder="aEfcAb0b"
          className="w-full p-3 bg-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition font-mono"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full p-3 bg-cyan-600 rounded-md font-semibold hover:bg-cyan-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Analytics"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">
          {error}
        </p>
      )}

      {analytics && (
        <div className="mt-6 p-4 bg-slate-700 rounded-md space-y-3">
          <h2 className="text-xl font-bold text-center text-cyan-400 mb-4">
            Analytics Results
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Total Clicks:</span>
            <span className="text-2xl font-bold text-white">
              {analytics.totalClicks}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Short URL ID:</span>
            <span className="font-mono text-white">{analytics.shortURL}</span>
          </div>
          <div className="pt-2">
            <p className="text-slate-400 mb-1">Original URL:</p>
            <a
              href={analytics.originalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 break-all hover:underline"
            >
              {analytics.originalURL}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
