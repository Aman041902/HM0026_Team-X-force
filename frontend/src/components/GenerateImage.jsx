import { useState, useEffect } from "react";
import axios from "axios";

export default function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  {
    console.log(import.meta.env.VITE_OPENAI_API_KEY);
  }

  // Get the API key from environment variables on component mount
  useEffect(() => {
    // In Vite, environment variables must be prefixed with VITE_
    const key = import.meta.env.VITE_OPENAI_API_KEY;
    console.log(key);
    setApiKey(key);

    if (!key) {
      console.warn(
        "OpenAI API key not found in environment variables. Make sure it's set in your .env file as VITE_OPENAI_API_KEY."
      );
    }
  }, []);

  const generateImage = async () => {
    if (!prompt) {
      setError("Please enter a prompt!");
      return;
    }

    if (!apiKey) {
      setError(
        "OpenAI API key not found. Please check your environment configuration."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          n: 1, // Number of images to generate
          size: "1024x1024", // Image size options: "256x256", "512x512", "1024x1024"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log("OpenAI API response:", response.data);

      if (
        response.data &&
        response.data.data &&
        response.data.data[0] &&
        response.data.data[0].url
      ) {
        const imageUrl = response.data.data[0].url;
        setImageUrl(imageUrl);
      } else {
        throw new Error("Unexpected response format from OpenAI API");
      }
    } catch (error) {
      console.error("Image generation error:", error);

      // Extract the most useful error message
      let errorMessage = "Failed to generate image.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = `API Error: ${
          error.response.data.error.message || error.response.data.error
        }`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image Description
        </label>
        <input
          id="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a detailed description of the image you want to generate..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={generateImage}
        disabled={loading || !prompt}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating Image...
          </span>
        ) : (
          "Generate Image"
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Image:</h3>
          <div className="bg-gray-100 rounded-lg p-2">
            <img
              src={imageUrl}
              alt="Generated from text"
              className="w-full rounded-lg"
            />
            <div className="mt-2 text-sm text-gray-500">
              <p>Prompt: "{prompt}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
