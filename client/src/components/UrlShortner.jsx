import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../context/UserContext";
import { toast } from "react-toastify";

function UrlShortner() {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [errorShort, setErrorShort] = useState("");
  const [errorLong, setErrorLong] = useState("");
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [retrivedLongUrl, setRetrivedLongUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleShortenUrl = async () => {
    if (!user) {
      toast.error("Please login to use the URL shortener");
      return;
    }
    setErrorShort("");
    setGeneratedShortUrl("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/shorten`,
        {
          longUrl: longUrl,
        }
      );
      if (response.data.status) {
        toast.success("Short URL generated successfully!");
        setGeneratedShortUrl(response.data.shortUrl);
      } else {
        toast.error("Failed to generate short URL");
        setErrorShort(response.data.error || "Failed to generate short URL");
      }
    } catch (err) {
      toast.error("An error occurred while generating the short URL");
      setErrorShort("An error occurred while generating the short URL");
    } finally {
      setLoading(false);
    }
  };

  const handleOriginalUrl = async () => {
    if (!user) {
      toast.error("Please login to retrieve the original URL");
      return;
    }
    setErrorLong("");
    setRetrivedLongUrl("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/original`,
        { shortUrl: shortUrl }
      );
      if (response.data.status) {
        toast.success("Original URL retrieved successfully!");
        setRetrivedLongUrl(response.data.longUrl);
      } else {
        toast.error("Failed to retrieve original URL");
        setErrorLong(response.data.error || "Failed to retrieve original URL");
      }
    } catch (err) {
      toast.error("An error occurred while retrieving the original URL");
      setErrorLong("An error occurred while retrieving the original URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight leading-tight">
        🚀 Your Ultimate URL Shortener
      </h1>

      <div className="grid gap-10 w-full max-w-2xl">
        {/* Long to Short URL Section */}
        <div className="bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl shadow-xl border border-zinc-700">
          <h2 className="text-lg font-medium text-white mb-3 tracking-wide">
            🔗 Convert Long URL to Short
          </h2>
          <input
            type="text"
            name="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL..."
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleShortenUrl}
            disabled={loading}
            className="mt-3 w-full py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all duration-300 shadow-sm"
          >
            Generate Short URL
          </button>
          {errorShort && (
            <p className="mt-2 text-red-500 text-sm">{errorShort}</p>
          )}
          {generatedShortUrl && (
            <p className="mt-2 text-green-500 text-sm">
              Short URL:{" "}
              <a href={generatedShortUrl} className="underline">
                {generatedShortUrl}
              </a>
            </p>
          )}
        </div>

        {/* Short to Long URL Section */}
        <div className="bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl shadow-xl border border-zinc-700">
          <h2 className="text-lg font-medium text-white mb-3 tracking-wide">
            🧭 Expand Short URL to Long
          </h2>
          <input
            type="text"
            placeholder="Enter short URL..."
            name="shortUrl"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleOriginalUrl}
            disabled={loading}
            className="mt-3 w-full py-2 rounded-md bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white text-sm font-medium transition-all duration-300 shadow-sm"
          >
            Get Original URL
          </button>
          {errorLong && (
            <p className="mt-2 text-red-500 text-sm">{errorLong}</p>
          )}
          {retrivedLongUrl && (
            <p className="mt-2 text-green-500 text-sm">
              Original URL:{" "}
              <a href={retrivedLongUrl} className="underline">
                {retrivedLongUrl}
              </a>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default UrlShortner;
