import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../context/UserContext";
import { toast } from "react-toastify";
import {
  Link as LinkIcon,
  Expand as ExpandIcon,
  Copy as CopyIcon,
  AlertCircle as AlertCircleIcon,
  Loader2 as Loader2Icon,
} from "lucide-react";

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

      <h1 className="text-3xl md:text-4xl text-gray-400 font-light tracking-tight leading-tight mb-8">
        🚀
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">
          The Smart
        </span>{" "}
        , Fast & Easy URL Shortener for Everyone.
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-3xl">
        Create, share, and track your links effortlessly — all in one place.
      </p>
      <div className="grid gap-6 w-full max-w-2xl">
        {/* Long to Short URL Section */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-700/50 hover:border-zinc-600 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <LinkIcon className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Convert Long URL to Short
            </h2>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              name="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/path..."
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800/70 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
            />
            <button
              onClick={handleShortenUrl}
              disabled={loading}
              className={`mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600/90 hover:to-pink-600/90 text-white text-sm font-medium transition-all duration-300 shadow-md ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Short URL"
              )}
            </button>

            {generatedShortUrl && (
              <div className="mt-3">
                <p className="text-xs text-zinc-400 mb-1">Short URL</p>
                <div className="flex items-center gap-1.5 bg-zinc-800/50 rounded-lg p-2 border border-zinc-700">
                  <a
                    href={generatedShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 text-sm font-mono truncate flex-1 hover:underline"
                  >
                    {generatedShortUrl}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedShortUrl);
                      toast.success("Short URL copied to clipboard!");
                    }}
                    className="p-1.5 rounded-md cursor-pointer hover:bg-zinc-700/50 transition-colors text-zinc-300 hover:text-white"
                    title="Copy to clipboard"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Short to Long URL Section */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-700/50 hover:border-zinc-600 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-pink-900/30 border border-pink-500/20">
              <ExpandIcon className="h-5 w-5 text-pink-400" />
            </div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Expand Short URL to Original
            </h2>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="https://short.url/abc123"
              name="shortUrl"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800/70 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
            />
            <button
              onClick={handleOriginalUrl}
              disabled={loading}
              className={`mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-600/90 hover:to-rose-600/90 text-white text-sm font-medium transition-all duration-300 shadow-md ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Expanding...
                </span>
              ) : (
                "Get Original URL"
              )}
            </button>

            {retrivedLongUrl && (
              <div className="mt-3">
                <p className="text-xs text-zinc-400 mb-1">Original URL</p>
                <div className="flex items-center gap-1.5 bg-zinc-800/50 rounded-lg p-2 border border-zinc-700">
                  <a
                    href={retrivedLongUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 text-sm font-mono truncate flex-1 hover:underline"
                  >
                    {retrivedLongUrl}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(retrivedLongUrl);
                      toast.success("Original URL copied to clipboard!");
                    }}
                    className="p-1.5 rounded-md cursor-pointer hover:bg-zinc-700/50 transition-colors text-zinc-300 hover:text-white"
                    title="Copy to clipboard"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default UrlShortner;
