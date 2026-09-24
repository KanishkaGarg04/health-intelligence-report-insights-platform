import { Clock, FileText, Calendar } from "lucide-react";
import { Badge } from "./common/UIComponents";

export default function RecentActivity({ reports = [] }) {
  const latest = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-400">
            <Clock size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h3>
            <p className="text-[11px] text-slate-400">
              Latest report uploads and analyses
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          Last {latest.length} {latest.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <div className="space-y-2.5">
        {latest.map((report) => {
          const isAbnormal =
            report.status?.toLowerCase() === "abnormal" ||
            report.status?.toLowerCase() === "action required";

          return (
            <div
              key={report._id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center text-slate-500 shrink-0">
                  <FileText size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {report.reportType || "Medical Report"}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar size={10} />
                    <span>
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 ml-3">
                <Badge variant={isAbnormal ? "abnormal" : "normal"} size="sm">
                  {report.status || "Normal"}
                </Badge>
              </div>
            </div>
          );
        })}

        {latest.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 italic">
            No recent activity recorded.
          </div>
        )}
      </div>
    </div>
  );
}