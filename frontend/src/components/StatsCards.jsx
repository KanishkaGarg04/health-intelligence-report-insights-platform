import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Layers,
} from "lucide-react";

export default function StatsCards({ reports = [] }) {
  const totalReports = reports.length;

  const normalReports = reports.filter(
    (r) => r.status?.toLowerCase() === "normal"
  ).length;

  const abnormalReports = reports.filter(
    (r) =>
      r.status?.toLowerCase() === "abnormal" ||
      r.status?.toLowerCase() === "action required"
  ).length;

  const totalBiomarkers = reports.reduce((acc, curr) => {
    return acc + (curr.insights?.parameters?.length || 0);
  }, 0);

  const stats = [
    {
      title: "Archived Reports",
      value: totalReports,
      caption: "Total documents analyzed",
      icon: FileText,
      accent: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/60",
    },
    {
      title: "Normal Baseline",
      value: normalReports,
      caption: "Optimal biomarker panels",
      icon: CheckCircle,
      accent: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/60",
    },
    {
      title: "Review Required",
      value: abnormalReports,
      caption: "Out-of-range indicators",
      icon: AlertTriangle,
      accent: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/60",
    },
    {
      title: "Tracked Biomarkers",
      value: totalBiomarkers,
      caption: "Discrete clinical values",
      icon: Layers,
      accent: "text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-100 dark:border-teal-900/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {item.caption}
                </p>
              </div>

              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.accent}`}
              >
                <Icon size={18} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}