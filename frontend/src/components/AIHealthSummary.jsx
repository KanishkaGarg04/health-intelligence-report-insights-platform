import {
  Brain,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "./common/UIComponents";

export default function AIHealthSummary({ reports = [] }) {
  const normal = reports.filter(
    (r) => r.status?.toLowerCase() === "normal"
  ).length;

  const abnormal = reports.filter(
    (r) =>
      r.status?.toLowerCase() === "abnormal" ||
      r.status?.toLowerCase() === "action required"
  ).length;

  const latestReport = reports[0];
  const summaryText =
    latestReport?.insights?.summary ||
    (reports.length === 0
      ? "Upload your first medical report to generate structured AI clinical summaries and health trend assessments."
      : "Aggregate data across your records demonstrates consistent baseline indicators. Review individual reports for detailed biomarker spreads.");

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
            <Brain size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Clinical Synthesis
            </h3>
            <p className="text-[11px] text-slate-400">
              Cross-panel summary &amp; biomarker overview
            </p>
          </div>
        </div>

        <Badge variant={abnormal > 0 ? "abnormal" : "normal"} size="sm">
          {abnormal > 0 ? `${abnormal} Needs Review` : "All Optimal"}
        </Badge>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {summaryText}
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
            <span>Optimal Baseline Reports</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-white">{normal}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
            <AlertTriangle size={15} className="text-amber-600 shrink-0" />
            <span>Biomarkers Flagged for Attention</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-white">{abnormal}</span>
        </div>
      </div>
    </div>
  );
}