import { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  SearchX,
  Bot,
  HelpCircle,
  Sparkles,
  ArrowRight,
  UploadCloud,
} from "lucide-react";
import { Badge, Button } from "./common/UIComponents";

export default function HistoryView({
  reports = [],
  setSelectedReport,
  setActiveTab,
}) {
  const [search, setSearch] = useState("");
  const [eli5States, setEli5States] = useState({});

  const toggleEli5 = (reportId, termIndex) => {
    const key = `${reportId}-${termIndex}`;
    setEli5States((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getEli5Explanation = (term) => {
    const lowerTerm = term.toLowerCase();

    if (
      lowerTerm.includes("hemoglobin") ||
      lowerTerm.includes("hgb")
    ) {
      return "Imagine your blood cells are tiny delivery trucks. Hemoglobin is the box inside each truck that carries oxygen around your body.";
    }

    if (
      lowerTerm.includes("glucose") ||
      lowerTerm.includes("blood sugar")
    ) {
      return "Think of glucose as the fuel your body uses for energy, just like petrol in a car.";
    }

    if (
      lowerTerm.includes("cholesterol") ||
      lowerTerm.includes("ldl") ||
      lowerTerm.includes("hdl")
    ) {
      return "LDL is like a truck that drops fat into your blood vessels, while HDL is the cleaning truck that removes it.";
    }

    if (
      lowerTerm.includes("creatinine") ||
      lowerTerm.includes("egfr")
    ) {
      return "Creatinine is a natural waste product. High levels may mean kidneys need a closer look to ensure they filter efficiently.";
    }

    return "This is a medical measurement doctors use to evaluate how effectively your organ systems are functioning.";
  };

  const filteredReports = reports.filter(
    (r) =>
      (r.fileName || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.reportType || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenChat = (report) => {
    setSelectedReport(report);
    // CRITICAL BUG FIX: Set tab to 'chatbot' (matches Dashboard.jsx tab identifier)
    setActiveTab("chatbot");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analysis History
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Review all previously parsed reports, simplified medical terms, and clinical insights.
          </p>
        </div>

        {reports.length > 0 && (
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-3 py-1.5 rounded-lg shrink-0">
            {reports.length} {reports.length === 1 ? "Report" : "Reports"} Archived
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by file name, panel type, or biomarker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
        />
      </div>

      {/* Reports List */}
      <div className="space-y-5">
        {filteredReports.map((report) => {
          const isAbnormal =
            report.status?.toLowerCase() === "abnormal" ||
            report.status?.toLowerCase() === "action required";

          return (
            <div
              key={report._id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-slate-300 dark:hover:border-slate-600"
            >
              {/* Top Row: Report Info & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400 shrink-0">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {report.reportType || "Medical Panel Report"}
                    </h3>

                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium truncate max-w-xs">{report.fileName}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>
                          {new Date(report.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Badge variant={isAbnormal ? "abnormal" : "normal"} size="sm">
                  {isAbnormal ? (
                    <>
                      <AlertTriangle size={12} />
                      <span>Review Flags</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={12} />
                      <span>Normal Baseline</span>
                    </>
                  )}
                </Badge>
              </div>

              {/* Body: Terms & Recommendations */}
              <div className="grid md:grid-cols-2 gap-5 mt-4">
                {/* Medical Terms */}
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Sparkles size={14} className="text-teal-600" />
                    <span>Parsed Medical Terms</span>
                  </div>

                  {report.insights?.simplifiedTerms?.length > 0 ? (
                    <div className="space-y-3">
                      {report.insights.simplifiedTerms.map((item, i) => {
                        const active = eli5States[`${report._id}-${i}`];

                        return (
                          <div
                            key={i}
                            className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 dark:text-white">
                                {item.term}
                              </span>

                              <button
                                type="button"
                                onClick={() => toggleEli5(report._id, i)}
                                className={`text-[11px] px-2 py-0.5 rounded-md font-medium inline-flex items-center gap-1 transition cursor-pointer ${
                                  active
                                    ? "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200"
                                    : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700 dark:bg-slate-700 dark:text-slate-300"
                                }`}
                              >
                                <HelpCircle size={11} />
                                {active ? "Standard View" : "Explain Simply"}
                              </button>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                              {active
                                ? getEli5Explanation(item.term)
                                : item.definition}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No discrete medical terms identified in this record.
                    </p>
                  )}
                </div>

                {/* Dietary & Lifestyle Recommendations */}
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Sparkles size={14} className="text-teal-600" />
                    <span>Personalized Guidelines</span>
                  </div>

                  {report.insights?.dietarySuggestions?.length > 0 ? (
                    <ul className="space-y-2">
                      {report.insights.dietarySuggestions.map((suggestion, i) => (
                        <li
                          key={i}
                          className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-teal-600 font-bold shrink-0">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No automated lifestyle directives for this record.
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom: Action bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Context ready for clinical consultation
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenChat(report)}
                  icon={Bot}
                >
                  <span>Discuss with Assistant</span>
                  <ArrowRight size={13} />
                </Button>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <SearchX size={22} />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {search ? "No matching reports found" : "No reports archived yet"}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
              {search
                ? `No reports matched your search term "${search}". Try checking for typos or searching by another biomarker.`
                : "Upload your first pathology document or lab report to extract biomarkers and build your history archive."}
            </p>

            {!search && (
              <div className="mt-5">
                <Button
                  variant="primary"
                  size="sm"
                  icon={UploadCloud}
                  onClick={() => setActiveTab("analyze")}
                >
                  Upload First Report
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}