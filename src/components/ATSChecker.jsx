import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import mammoth from "mammoth";
import './ATSChecker.css'

// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [atsNumericScore, setAtsNumericScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const extractText = async (file) => {
    try {
      if (file.type === "application/pdf") {
        return await extractTextFromPDF(file);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return await extractTextFromDOCX(file);
      } else if (file.type === "text/plain") {
        return await file.text();
      } else {
        alert("Unsupported file type. Please upload PDF, DOCX, or TXT.");
        return null;
      }
    } catch (error) {
      console.error("Text extraction error:", error);
      alert("Failed to extract text from file.");
      return null;
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let text = "";
          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            text += textContent.items.map((item) => item.str).join(" ");
          }
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromDOCX = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const result = await mammoth.extractRawText({
            arrayBuffer: event.target.result,
          });
          resolve(result.value);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a resume file.");
      return;
    }

    setLoading(true);
    setAtsScore(null);
    setAtsNumericScore(null);

    try {
      const resumeText = await extractText(file);
      if (!resumeText) {
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `Act like an ATS system and do strict evaluation. Review the following resume for keyword optimization, formatting, readability, and job relevance. Then:
- Give an ATS compatibility score out of 100.
- Suggest 3 to 5 specific improvements.
Here is the resume text:
${resumeText}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const atsContent = data.choices?.[0]?.message?.content;
      if (!atsContent) throw new Error("Invalid response from ChatGPT");

      setAtsScore(atsContent);

      // Improved score extraction
      const scoreMatch =
        atsContent.match(/(\d{1,3})\s*(?:\/|out\s*of)\s*100/i) ||
        atsContent.match(/score[^:]*[:\-]?\s*(\d{1,3})/i);
      if (scoreMatch) {
        setAtsNumericScore(parseInt(scoreMatch[1]));
      }
    } catch (error) {
      console.error("OpenAI error:", error);
      alert("Failed to get ATS score. Try again.");
    }

    setLoading(false);
  };

  const getColor = (score) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6">ATS Resume Checker</h1>

      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
        className="border p-2 rounded-lg"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Checking..." : "Upload and Check"}
      </button>

      {loading && (
        <div className="mt-4 animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
      )}

      {atsNumericScore !== null && (
        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-3">ATS Score</h2>
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-gray-300"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="60"
                cx="80"
                cy="80"
              />
              <circle
                className={getColor(atsNumericScore)}
                strokeWidth="10"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * atsNumericScore) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="60"
                cx="80"
                cy="80"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {atsNumericScore}%
            </div>
          </div>
        </div>
      )}

      {atsScore && (
        <div className="mt-8 p-4 border rounded-lg w-full max-w-3xl bg-gray-50">
          <h2 className="text-xl font-bold mb-2">ATS Analysis</h2>
          <p className="whitespace-pre-line">{atsScore}</p>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
