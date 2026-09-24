import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  Clock,
  User,
  Bot,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";
import AIHealthSummary from "./AIHealthSummary";
import RecentActivity from "./RecentActivity";
import AnalyticsCharts from "./AnalyticsCharts";
import StatsCards from "./StatsCards";
import DashboardView from "./DashboardView";
import UploadView from "./UploadView";
import HistoryView from "./HistoryView";
import ChatbotView from "./ChatbotView";
import ProfileView from "./ProfileView";
import { PlatformLogo } from "./common/UIComponents";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ================= Fetch Reports =================
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reports/history`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setReports(res.data.data || res.data || []);
    } catch (err) {
      console.error("Failed fetching database history records:", err);
    }
  };

  // ================= Initial Load =================
  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reports/history`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!ignore) {
          setReports(res.data.data || res.data || []);
        }
      } catch (err) {
        console.error("Failed fetching database history records:", err);
      }
    };

    loadData();

    const syncUser = () => {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", syncUser);
    return () => {
      ignore = true;
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // ================= Dark Mode =================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ================= Logout =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analyze", label: "Analyze Report", icon: FilePlus },
    { id: "history", label: "Report History", icon: Clock },
    { id: "chatbot", label: "AI Assistant", icon: Bot },
    { id: "profile", label: "User Profile", icon: User },
  ];

  // User initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex min-h-screen bg-[#fafbfe] dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased font-sans">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-5 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
            <PlatformLogo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Matrix */}
          <nav className="space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active =
                activeTab === id ||
                (id === "overview" && activeTab === "home") ||
                (id === "chatbot" && activeTab === "copilot");

              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    active
                      ? "bg-slate-900 text-white dark:bg-teal-600 shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Link to Public Landing Page */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
            >
              <span>Platform Landing</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Bottom User Area & Utilities */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* User Card */}
          <div
            onClick={() => {
              setActiveTab("profile");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 p-2 rounded-xl transition"
          >
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt=""
                className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {initials}
              </div>
            )}

            <div className="truncate">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                {user?.name || "Patient"}
              </h4>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || "View account"}
              </p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition cursor-pointer"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            <span>{darkMode ? "Light Appearance" : "Dark Appearance"}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-2xs z-40 md:hidden"
        />
      )}

      {/* ================= MAIN CONTENT VIEWPORT ================= */}
      <main className="flex-1 w-full md:ml-64 min-h-screen flex flex-col">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 px-4 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>

            {/* Breadcrumb / Current View Identifier */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">Platform</span>
              <span className="hidden sm:inline">/</span>
              <span className="font-bold text-slate-900 dark:text-white capitalize">
                {activeTab === "home" ? "Overview" : activeTab}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Selected Report Pill (Requirement 10) */}
            {selectedReport && (
              <div
                onClick={() => setActiveTab("chatbot")}
                className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/50 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-[11px] font-medium px-2.5 py-1 rounded-full cursor-pointer hover:bg-teal-100 transition truncate max-w-[200px]"
                title="Active report locked in assistant context. Click to chat."
              >
                <FileText size={12} className="shrink-0" />
                <span className="truncate">Active: {selectedReport.fileName}</span>
              </div>
            )}

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg">
              <ShieldCheck size={12} className="text-teal-600" />
              <span>Encrypted Session</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {/* TAB 1: OVERVIEW */}
          {(activeTab === "overview" || activeTab === "home") && (
            <div className="space-y-6">
              <StatsCards reports={reports} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <AIHealthSummary reports={reports} />
                <RecentActivity reports={reports} />
              </div>

              <AnalyticsCharts reports={reports} />

              <DashboardView reports={reports} />
            </div>
          )}

          {/* TAB 2: ANALYZE REPORT */}
          {activeTab === "analyze" && (
            <UploadView
              onUploadComplete={fetchReports}
              onOpenChatWithReport={(report) => {
                setSelectedReport(report);
                setActiveTab("chatbot");
              }}
            />
          )}

          {/* TAB 3: REPORT HISTORY */}
          {activeTab === "history" && (
            <HistoryView
              reports={reports}
              setSelectedReport={setSelectedReport}
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 4: CHATBOT / AI CONSULTANT */}
          {(activeTab === "chatbot" || activeTab === "copilot") && (
            <ChatbotView
              reportContext={selectedReport}
              onClearContext={() => setSelectedReport(null)}
            />
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === "profile" && <ProfileView reports={reports} />}

          {/* Graceful Fallback (Prevents ANY blank white screen bug) */}
          {![
            "overview",
            "home",
            "analyze",
            "history",
            "chatbot",
            "copilot",
            "profile",
          ].includes(activeTab) && (
            <div className="text-center py-16 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                View Not Found
              </h3>
              <p className="text-xs text-slate-500">
                Returning you to the primary overview.
              </p>
              <button
                onClick={() => setActiveTab("overview")}
                className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                Return to Overview
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}