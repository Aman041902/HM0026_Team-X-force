import { useState } from "react";

// Default
import Groq from "groq-sdk";

import TranslateSummary from "./TranslateSummary";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getAIResponse() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "what is python in 100 words",
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    return chatCompletion.choices[0]?.message?.content || "No response";
  } catch (error) {
    return "Error fetching response";
  }
}

function Summary() {
  const [response, setResponse] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const result = await getAIResponse();
    setResponse(result);
    setShowPopup(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Summary Generator
          </h1>
          <p className="text-lg text-gray-600">
            Get instant summaries powered by advanced AI technology
          </p>
        </div>

        {/* Generate Button Section */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleClick}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg
              hover:bg-indigo-700 transition-all duration-300
              transform hover:scale-105 active:scale-95
              disabled:bg-gray-400 disabled:cursor-not-allowed
              flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Summary...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Generate Summary</span>
              </>
            )}
          </button>
        </div>

        {/* Modal/Popup for showing response */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Generated Summary
                  </h2>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Original Summary */}
                  <div className="prose max-w-none bg-gray-50 rounded-lg p-6 mb-6">
                    {response}
                  </div>

                  {/* Translation Section */}
                  {showTranslation ? (
                    <div className="mt-6">
                      <TranslateSummary summary={response} />
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowTranslation(true)}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md
                        hover:bg-green-700 transition-colors duration-300
                        flex items-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      <span>Translate Summary</span>
                    </button>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end space-x-4">
                  <button
                    onClick={() => navigator.clipboard.writeText(response)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md
                      hover:bg-gray-50 transition-colors duration-300
                      flex items-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setShowTranslation(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md
                      hover:bg-indigo-700 transition-colors duration-300
                      flex items-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;
