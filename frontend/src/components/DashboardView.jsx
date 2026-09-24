import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Sparkles,
  HeartPulse,
  Ban,
  Apple,
  Pill,
} from "lucide-react";

export default function DashboardView({ reports = [] }) {
  const latestReport = reports[0] || {};
  const insights = latestReport.insights || {};
  const averageHealthIndex = insights.overallHealth || 72;

  // Calm color coding matrix
  const getSeverityStyle = (statusText = "", score = 70) => {
    const text = statusText.toLowerCase();
    if (text === "critical" || text === "action required" || score < 50) {
      return {
        bg: "bg-rose-50/60 dark:bg-rose-950/40",
        border: "border-rose-200/80 dark:border-rose-900",
        text: "text-rose-700 dark:text-rose-300",
        accent: "#f43f5e",
        badge: "Attention Required",
      };
    }
    if (
      text === "abnormal" ||
      text === "warning" ||
      text === "mild risk" ||
      (score >= 50 && score < 75)
    ) {
      return {
        bg: "bg-amber-50/60 dark:bg-amber-950/40",
        border: "border-amber-200/80 dark:border-amber-900",
        text: "text-amber-800 dark:text-amber-300",
        accent: "#d97706",
        badge: "Moderate Attention",
      };
    }
    return {
      bg: "bg-emerald-50/60 dark:bg-emerald-950/40",
      border: "border-emerald-200/80 dark:border-emerald-900",
      text: "text-emerald-700 dark:text-emerald-300",
      accent: "#0d9488",
      badge: "Optimal Baseline",
    };
  };

  const severity = getSeverityStyle(
    latestReport.status || insights.status,
    averageHealthIndex
  );

  const chartData =
    reports.length > 0
      ? reports
          .map((r, i) => ({
            name: r.insights?.reportType
              ? r.insights.reportType.split(" ")[0]
              : `Report ${i + 1}`,
            value: r.insights?.overallHealth
              ? r.insights.overallHealth / 10
              : 7.0,
          }))
          .reverse()
      : [
          { name: "CBC", value: 6.8 },
          { name: "Thyroid", value: 7.4 },
          { name: "Lipid", value: 6.2 },
          { name: "Metabolic", value: 7.2 },
        ];

  return (
    <div className="space-y-6">
      {/* SECTION 1: Health Index & Overview Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Trend Area Chart */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Health Index Trajectory
              </h4>
              <p className="text-slate-400 text-[11px]">
                Calculated aggregate score across sequential report uploads
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md">
              Score Benchmark: 10.0 Max
            </span>
          </div>

          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -24, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="minimalTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#cbd5e1"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={4}
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  stroke="#cbd5e1"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dx={-4}
                  domain={[0, 10]}
                  tickCount={6}
                  tick={{ fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="url(#minimalTeal)"
                  dot={{ r: 3, fill: "#fff", strokeWidth: 2, stroke: "#0d9488" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Minimal Health Score Gauge */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Condition Baseline
            </span>
            <span className="text-[10px] text-slate-400">Latest Panel</span>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="44"
                stroke="#f1f5f9"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="44"
                stroke={severity.accent}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={276}
                strokeDashoffset={276 - (276 * averageHealthIndex) / 100}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {averageHealthIndex}%
              </span>
              <span className="block text-[9px] text-slate-400 font-medium">Index</span>
            </div>
          </div>

          <div
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${severity.bg} ${severity.border} ${severity.text}`}
          >
            {severity.badge}
          </div>
        </div>
      </div>

      {/* SECTION 2: AI Synthesis Summary & Risk Profile Vector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Dynamic Insight Summary */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <Sparkles size={15} className="text-teal-600" />
            <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              AI Clinical Summary
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {insights.summary ||
              "Upload a report to populate automatic clinical summaries and structured metric evaluations."}
          </p>
        </div>

        {/* Risk Profile Vector */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <HeartPulse size={15} className="text-teal-600" />
            <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Predicted Risk Vector
            </h3>
          </div>
          <div
            className={`p-3.5 rounded-xl border ${severity.bg} ${severity.border} space-y-1`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Observed Tendency
            </p>
            <p className={`text-xs font-bold ${severity.text}`}>
              {insights.diseaseRiskPrediction ||
                "Standard healthy parameters observed without elevated risk flags."}
            </p>
            <p className="text-[10px] text-slate-400 font-normal pt-1.5 border-t border-slate-200/40 dark:border-slate-700/40 mt-1.5">
              *Calculated for educational review. Always confirm with your physician.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Actionable Directives & Medication Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Personalized Recommendations */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Personalized Health Directives
              </h3>
              <p className="text-[11px] text-slate-400">
                Actionable nutritional and lifestyle recommendations extracted from your labs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dietary Directives */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Apple size={13} className="text-teal-600" />
                <span>Dietary Measures</span>
              </div>
              <div className="space-y-2">
                {insights.dietarySuggestions &&
                insights.dietarySuggestions.length > 0 ? (
                  insights.dietarySuggestions.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <span className="font-bold block text-slate-900 dark:text-white">
                        {item.split(":")[0]}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 leading-normal">
                        {item.split(":")[1] || item}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    No custom dietary measures logged.
                  </p>
                )}
              </div>
            </div>

            {/* Routine & Precautions */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Ban size={13} className="text-rose-500" />
                <span>Clinical Precautions</span>
              </div>
              <div className="space-y-2">
                {insights.whatToAvoid && insights.whatToAvoid.length > 0 ? (
                  insights.whatToAvoid.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <span className="font-bold block text-slate-900 dark:text-white">
                        {item.split(":")[0]}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 leading-normal">
                        {item.split(":")[1] || item}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    No specific restrictions identified.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Medication & Supplement Support */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <Pill size={15} className="text-teal-600" />
            <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Identified Medications
            </h4>
          </div>

          <div className="space-y-2">
            {insights.medications && insights.medications.length > 0 ? (
              insights.medications.map((pill, idx) => (
                <div
                  key={idx}
                  className="border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl space-y-0.5"
                >
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                    <span>Rx Entry 0{idx + 1}</span>
                    <span className="text-teal-700 dark:text-teal-400 font-bold">
                      {pill.name}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {pill.dose}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight">
                    {pill.instruction}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 italic">
                No active pharmaceutical rows parsed from reports.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}