import { useState, useRef } from "react";
import axios from "axios";
import {
  UploadCloud,
  Loader2,
  AlertCircle,
  ListFilter,
  Sparkles,
  Bot,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Activity,
} from "lucide-react";
import { Badge, Button } from "./common/UIComponents";

export default function UploadView({ onUploadComplete, onOpenChatWithReport }) {
  const [loading, setLoading] = useState(false);
  const [progressStage, setProgressStage] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const resultsRef = useRef(null);

  const stages = [
    "Uploading document securely...",
    "Running multimodal OCR extraction...",
    "Parsing biomarkers & normal ranges...",
    "Synthesizing clinical insights...",
  ];

  const processUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/") && !file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
      setError("Please select a supported image file (JPG, PNG, WEBP).");
      return;
    }

    setLoading(true);
    setProgressStage(0);
    setError("");
    setResult(null);

    // Simulated progress stage ticker for refined UX
    const stageTimer = setInterval(() => {
      setProgressStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 1800);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reports/analyze`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      clearInterval(stageTimer);
      setProgressStage(stages.length - 1);
      setResult(res.data.report);

      if (onUploadComplete) {
        onUploadComplete();
      }

      // Smooth scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    } catch (err) {
      clearInterval(stageTimer);
      setError(
        err.response?.data?.message ||
          "Analysis failed. Please verify the server is running and the image is clear."
      );
    } finally {
      clearInterval(stageTimer);
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Analyze Medical Report
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Upload pathology panels or lab test reports for automated biomarker extraction and structured AI synthesis.
        </p>
      </div>

      {/* Upload Drop Zone Card */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all bg-white dark:bg-slate-800 ${
          isDragOver
            ? "border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 scale-[0.99]"
            : "border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
        } shadow-xs`}
      >
        {loading ? (
          <div className="py-6 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800 flex items-center justify-center text-teal-600 mx-auto">
              <Loader2 className="animate-spin" size={24} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {stages[progressStage]}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Step {progressStage + 1} of {stages.length}: Please keep this window open while the document is processed.
              </p>
            </div>

            {/* Stepper bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full transition-all duration-500"
                style={{
                  width: `${((progressStage + 1) / stages.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-800/60 text-teal-700 dark:text-teal-400 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <UploadCloud size={28} />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Drag and drop your report here, or browse
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Supports image files (JPG, PNG, WEBP). Standard pathology panels, complete blood counts, and metabolic profiles.
              </p>
            </div>

            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processUpload(e.target.files[0]);
                }
              }}
            />

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => document.getElementById("fileInput").click()}
                icon={FileCheck2}
              >
                Select Report File
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-teal-600" />
                Private &amp; Encrypted
              </span>
              <span>•</span>
              <span>Max size: 10MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Prompt */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200/80 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-200 rounded-2xl text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{error}</div>
        </div>
      )}

      {/* ================= EXTRACTED RESULTS VIEW ================= */}
      {result && (
        <div
          ref={resultsRef}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-6 scroll-mt-6 animate-in fade-in duration-300"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700/70">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="info" size="sm">
                  Extraction Complete
                </Badge>
                <span className="text-[11px] text-slate-400">
                  Source: {result.fileName}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                {result.reportType || "General Medical Report"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={
                  result.status?.toLowerCase() === "abnormal"
                    ? "abnormal"
                    : "normal"
                }
                size="md"
              >
                {result.status === "Abnormal"
                  ? "Attention Required"
                  : "Within Normal Range"}
              </Badge>

              {onOpenChatWithReport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChatWithReport(result)}
                  icon={Bot}
                >
                  Discuss
                </Button>
              )}
            </div>
          </div>

          {/* AI Clinical Summary */}
          {result.insights?.summary && (
            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 dark:text-teal-200">
                <Sparkles size={14} className="text-teal-600" />
                <span>AI Clinical Synthesis Summary</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.insights.summary}
              </p>
            </div>
          )}

          {/* Parameters Table Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListFilter size={15} className="text-teal-600" />
                <span>Parsed Biomarkers ({result.insights?.parameters?.length || 0})</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                Normalized against clinical benchmarks
              </span>
            </div>

            <div className="border border-slate-200/80 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-700 font-semibold text-slate-500 dark:text-slate-400">
                      <th className="py-3 px-4 text-left">Biomarker / Test</th>
                      <th className="py-3 px-4 text-left">Your Value</th>
                      <th className="py-3 px-4 text-left">Benchmark Range</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {result.insights?.parameters &&
                    result.insights.parameters.length > 0 ? (
                      result.insights.parameters.map((p, i) => {
                        const isAbnormal =
                          p.status?.toLowerCase() === "abnormal" ||
                          p.status?.toLowerCase() === "high" ||
                          p.status?.toLowerCase() === "low";

                        return (
                          <tr
                            key={i}
                            className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                              {p.testName}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                              {p.value} {p.unit}
                            </td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                              {p.normalRange || "—"}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge
                                variant={isAbnormal ? "abnormal" : "normal"}
                                size="sm"
                              >
                                {p.status || "Normal"}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-8 text-center text-slate-400 italic"
                        >
                          No discrete biomarker rows detected in this document.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Tailored Directives */}
          <div className="grid md:grid-cols-2 gap-5 pt-2">
            {/* Dietary Guidelines */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles size={13} className="text-teal-600" />
                <span>Dietary Strategy Directives</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {result.insights?.dietarySuggestions &&
                result.insights.dietarySuggestions.length > 0 ? (
                  result.insights.dietarySuggestions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-teal-600 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400 italic">
                    No custom dietary measures generated.
                  </li>
                )}
              </ul>
            </div>

            {/* Lifestyle Routine Guidelines */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                <Activity size={13} className="text-teal-600" />
                <span>Routine &amp; Lifestyle Guidance</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {result.insights?.lifestyleChanges &&
                result.insights.lifestyleChanges.length > 0 ? (
                  result.insights.lifestyleChanges.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-teal-600 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400 italic">
                    No routine adjustments identified.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Action */}
          {onOpenChatWithReport && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Have questions about these metrics? Ask the clinical assistant directly.
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => onOpenChatWithReport(result)}
                icon={Bot}
              >
                <span>Discuss this Report with Assistant</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}