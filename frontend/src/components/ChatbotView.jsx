import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  X,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Badge } from "./common/UIComponents";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

let messageCounter = 100;

export default function ChatbotView({
  reportContext,
  onClearContext,
}) {
  const location = useLocation();

  // Report context can come from Dashboard prop or react-router state
  const currentReport = reportContext || location.state?.report;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text:
        "Hello. I am your Health Intelligence Assistant. I can help interpret laboratory biomarkers, explain complex medical terminology in plain English, and suggest questions to discuss with your physician.\n\nHow may I assist you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const lastContextRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Load report context when selected
  useEffect(() => {
    if (!currentReport) return;

    if (lastContextRef.current === currentReport.fileName) {
      return;
    }

    lastContextRef.current = currentReport.fileName;

    const notifMsg = {
      id: ++messageCounter,
      sender: "ai",
      isSystemNotification: true,
      text: `Active Report Loaded: ${currentReport.fileName} (${currentReport.reportType || "General Medical Report"}) with status: ${currentReport.status || "Normal"}. You can ask any specific questions regarding these extracted biomarkers.`,
    };

    setMessages((prev) => [...prev, notifMsg]);
  }, [currentReport]);

  // Context-aware suggested prompts
  const contextSuggestions = currentReport
    ? [
        "Explain any abnormal markers in this report",
        "What dietary adjustments does this report suggest?",
        "What questions should I ask my doctor?",
      ]
    : [
        "What is a standard Hemoglobin benchmark?",
        "Explain lipid profile parameters",
        "Difference between LDL and HDL cholesterol",
      ];

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || input;

    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      id: ++messageCounter,
      sender: "user",
      text: textToSend,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    if (!customText) {
      setInput("");
    }

    setIsLoading(true);

    try {
      let payloadPrompt = textToSend;

      if (currentReport) {
        payloadPrompt = `
Medical Report Context:
Report Type: ${currentReport.reportType || "Medical Report"}
Status: ${currentReport.status || "Unknown"}
Extracted Report Data: ${currentReport.extractedText || "No report text available"}
Parameters: ${JSON.stringify(currentReport.insights?.parameters || [])}
Summary: ${currentReport.insights?.summary || ""}

User Question:
${textToSend}
`;
      }

      const history = updatedMessages
        .filter((msg) => !msg.isSystemNotification)
        .slice(-10)
        .map((msg) => ({
          role: msg.sender,
          text: msg.text,
        }));

      const response = await axios.post(
        `${API_URL}/api/chat`,
        {
          message: payloadPrompt,
          history,
        },
        {
          timeout: 20000,
        }
      );

      const aiReply =
        response.data?.reply ||
        response.data?.message ||
        response.data?.data ||
        "I could not formulate a response for that prompt. Please try asking again.";

      const aiMessage = {
        id: ++messageCounter,
        sender: "ai",
        text: aiReply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chatbot Error:", err);

      let errorMessage =
        "An unexpected error occurred while contacting the consultation service.";

      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = "Invalid prompt sent to the service.";
            break;
          case 401:
            errorMessage = "Authentication expired. Please log in again.";
            break;
          case 429:
            errorMessage = "AI request capacity reached. Please try again shortly.";
            break;
          case 500:
            errorMessage = "Server intelligence pipeline returned an error.";
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.request) {
        errorMessage =
          "Unable to connect to the backend server. Please verify your connection.";
      }

      const errorMsg = {
        id: ++messageCounter,
        sender: "ai",
        isError: true,
        text: errorMessage,
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-130px)] bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-teal-600 to-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs">
            <Sparkles size={16} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              Health Intelligence Assistant
            </h3>
            <p className="text-[11px] text-slate-400">
              Clinical Document &amp; Biomarker Clarification
            </p>
          </div>
        </div>

        {/* Professional Security & Privacy Badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/40">
          <ShieldCheck size={13} className="text-teal-600 dark:text-teal-400" />
          <span>Private Session</span>
        </div>
      </div>

      {/* Selected Report Context Banner (Requirement 10) */}
      {currentReport && (
        <div className="bg-teal-50/70 dark:bg-teal-950/40 border-b border-teal-100 dark:border-teal-900/60 px-5 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-teal-950 dark:text-teal-200 font-medium truncate">
            <FileText size={15} className="text-teal-700 dark:text-teal-400 shrink-0" />
            <span className="truncate">
              Discussing: <strong className="font-bold text-slate-900 dark:text-white">{currentReport.fileName}</strong>
              <span className="text-teal-700 dark:text-teal-300 ml-1.5 hidden sm:inline">
                ({currentReport.reportType || "Medical Report"})
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant={
                currentReport.status?.toLowerCase() === "abnormal"
                  ? "abnormal"
                  : "normal"
              }
              size="sm"
            >
              {currentReport.status || "Normal"}
            </Badge>

            <button
              type="button"
              onClick={onClearContext}
              title="Clear report context"
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-teal-100/50 dark:hover:bg-teal-900/50 transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-5 bg-slate-50/60 dark:bg-slate-900/40 space-y-4">
        {messages.map((msg) => {
          if (msg.isSystemNotification) {
            return (
              <div
                key={msg.id}
                className="bg-white dark:bg-slate-800 border border-teal-200/80 dark:border-teal-800/60 text-slate-700 dark:text-slate-200 rounded-xl p-3 text-xs flex items-start gap-2 shadow-2xs"
              >
                <Sparkles size={14} className="text-teal-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{msg.text}</span>
              </div>
            );
          }

          const isAI = msg.sender === "ai";

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAI ? "justify-start" : "justify-end"}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400 shrink-0 mt-0.5">
                  <Bot size={15} />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                  msg.isError
                    ? "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-900"
                    : isAI
                    ? "bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-2xs"
                    : "bg-slate-900 text-white dark:bg-teal-600"
                }`}
              >
                {msg.text}
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 mt-0.5 text-xs font-bold">
                  <User size={14} />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800 flex items-center justify-center text-teal-700 shrink-0">
              <Bot size={15} />
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 shadow-2xs">
              <span className="inline-block w-2 h-2 rounded-full bg-teal-600 animate-ping" />
              <span>Analyzing biomarkers and formulating response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2 shrink-0">
        {contextSuggestions.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isLoading}
            onClick={() => handleSendMessage(suggestion)}
            className="text-[11px] bg-slate-50 hover:bg-teal-50 hover:text-teal-700 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-200/70 dark:border-slate-600 transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <span>{suggestion}</span>
            <ArrowRight size={11} />
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200/80 dark:border-slate-700 flex gap-2">
        <input
          type="text"
          value={input}
          autoComplete="off"
          spellCheck={false}
          disabled={isLoading}
          placeholder="Ask a clarifying question about your report or clinical terms..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50 dark:bg-slate-900 transition"
        />

        <button
          type="button"
          disabled={!input.trim() || isLoading}
          onClick={() => handleSendMessage()}
          className="bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 disabled:opacity-40 text-white rounded-xl px-4 flex items-center justify-center transition shadow-2xs cursor-pointer"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}