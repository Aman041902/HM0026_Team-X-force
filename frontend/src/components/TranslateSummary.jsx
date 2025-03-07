import { useState } from "react";

// Default
import Groq from "groq-sdk";

console.log(import.meta.env.VITE_GROQ_API_KEY)

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const languageOptions = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
];

async function getAIResponse() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "translate in spanish",
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    return chatCompletion.choices[0]?.message?.content || "No response";
  } catch (error) {
    return "Error fetching response";
  }
}

function TranslateSummary({ summary }) {
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Translate the following text to ${
              languageOptions.find((lang) => lang.code === selectedLanguage)
                .name
            }:\n\n${summary}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      setTranslatedText(
        chatCompletion.choices[0]?.message?.content || "No response"
      );
    } catch (error) {
      setError("Translation failed. Please try again.");
      console.error("Translation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Translation Controls */}
      <div className="flex flex-wrap gap-4 items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 
            bg-white shadow-sm text-gray-700 min-w-[150px]"
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleTranslate}
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
            disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2
            transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Translating...</span>
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
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span>Translate</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Text Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Text Panel */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-3 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-700">Original Text</h3>
          </div>
          <div className="p-4 h-[300px] overflow-y-auto">
            <p className="text-gray-600 whitespace-pre-wrap">{summary}</p>
          </div>
        </div>

        {/* Translated Text Panel */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-3 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-700 flex items-center justify-between">
              <span>Translated Text</span>
              {translatedText && (
                <span className="text-sm font-normal text-gray-500">
                  (
                  {
                    languageOptions.find(
                      (lang) => lang.code === selectedLanguage
                    ).name
                  }
                  )
                </span>
              )}
            </h3>
          </div>
          <div className="p-4 h-[300px] overflow-y-auto">
            {translatedText ? (
              <p className="text-gray-600 whitespace-pre-wrap">
                {translatedText}
              </p>
            ) : (
              <p className="text-gray-400 italic">
                Translation will appear here...
              </p>
            )}
          </div>
          {translatedText && (
            <div className="p-3 border-t bg-gray-50">
              <button
                onClick={() => navigator.clipboard.writeText(translatedText)}
                className="px-3 py-1.5 text-sm text-gray-600 bg-white 
                  hover:bg-gray-50 rounded border border-gray-200 
                  flex items-center gap-2 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
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
                <span>Copy Translation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TranslateSummary;
