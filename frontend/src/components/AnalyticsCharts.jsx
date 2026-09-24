import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Legend,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { BarChart3, TrendingUp, PieChart as PieIcon } from "lucide-react";

export default function AnalyticsCharts({ reports = [] }) {
  const normal = reports.filter(
    (r) => r.status?.toLowerCase() === "normal"
  ).length;

  const abnormal = reports.filter(
    (r) =>
      r.status?.toLowerCase() === "abnormal" ||
      r.status?.toLowerCase() === "action required"
  ).length;

  const pieData = [
    { name: "Normal Baseline", value: normal || (reports.length === 0 ? 1 : 0) },
    { name: "Attention Required", value: abnormal },
  ];

  const COLORS = ["#0d9488", "#f43f5e"];

  // Monthly Uploads
  const monthly = {};
  reports.forEach((report) => {
    const month = new Date(report.createdAt).toLocaleString("default", {
      month: "short",
    });
    monthly[month] = (monthly[month] || 0) + 1;
  });

  const lineData =
    Object.keys(monthly).length > 0
      ? Object.keys(monthly).map((month) => ({
          month,
          reports: monthly[month],
        }))
      : [
          { month: "Jan", reports: 1 },
          { month: "Feb", reports: 2 },
          { month: "Mar", reports: 1 },
        ];

  // Report Categories
  const types = {};
  reports.forEach((report) => {
    const type = report.reportType || "General";
    types[type] = (types[type] || 0) + 1;
  });

  const barData =
    Object.keys(types).length > 0
      ? Object.keys(types).map((type) => ({
          type: type.length > 14 ? `${type.substring(0, 12)}...` : type,
          count: types[type],
        }))
      : [
          { type: "CBC Panel", count: 1 },
          { type: "Lipid Panel", count: 1 },
          { type: "Metabolic", count: 1 },
        ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
            Longitudinal Analytics &amp; Distribution
          </h3>
          <p className="text-[11px] md:text-xs text-slate-400">
            Biomarker normality ratio, monthly uploads, and diagnostic categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Donut Chart: Report Status Ratio */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <PieIcon size={16} className="text-teal-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Biomarker Status Ratio
            </span>
          </div>

          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={65}
                  innerRadius={40}
                  paddingAngle={4}
                  isAnimationActive
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    fontSize: "11px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Upload Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <TrendingUp size={16} className="text-teal-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Upload Timeline Trajectory
            </span>
          </div>

          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    fontSize: "11px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#0d9488" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Categories */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <BarChart3 size={16} className="text-teal-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Panel Classification
            </span>
          </div>

          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="type"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}