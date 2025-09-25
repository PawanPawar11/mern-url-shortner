import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function HomePage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);
    setCopied(false);

    if (!originalUrl) {
      setError("Please enter a URL to shorten.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create short URL.");
      }

      setShortUrl(data.data.shortURL);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const fullUrl = `${API_BASE_URL}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl transition-all">
      <h1 className="text-3xl font-bold text-center mb-2 text-cyan-400">
        URL Shortener
      </h1>
      <p className="text-slate-400 text-center mb-6">
        Enter a long URL to make it short and sweet.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="w-full p-3 bg-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full p-3 bg-cyan-600 rounded-md font-semibold hover:bg-cyan-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Get Short URL"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-slate-700 rounded-md text-center">
          <p className="text-slate-300 mb-2">Your short URL is ready:</p>
          <div className="flex items-center justify-center bg-slate-900 p-3 rounded-md">
            <a
              href={`${API_BASE_URL}/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-lg text-cyan-400 hover:underline"
            >
              {`${window.location.host}/api/${shortUrl}`}
            </a>
            <button
              onClick={handleCopy}
              className="ml-4 px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded-md text-sm font-semibold transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
