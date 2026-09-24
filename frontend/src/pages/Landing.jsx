import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Sparkles,
  Clock,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Activity,
  ArrowRight,
  ChevronRight,
  FileCheck2,
  Lock,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge, PlatformLogo } from "../components/common/UIComponents";

export default function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleStartAnalysis = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-800 antialiased flex flex-col">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <PlatformLogo />

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Capabilities
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#privacy" className="hover:text-slate-900 transition-colors">
              Privacy &amp; Safety
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {token ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                <span>Open Dashboard</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-xs"
                >
                  <span>Get Started</span>
                  <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-white to-[#fafbfe]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-xs font-semibold">
                <Sparkles size={13} className="text-teal-600" />
                <span>Clinical Document Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
                Understand your health reports{" "}
                <span className="font-cursive text-teal-700 text-4xl sm:text-5xl md:text-6xl font-normal whitespace-nowrap">
                  with clarity
                </span>
                .
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Transform complex pathology results into structured biomarker insights,
                explainable health summaries, and interactive guidance—while keeping your
                complete report history organized in one calm, secure space.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleStartAnalysis}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <FileText size={16} />
                  <span>{token ? "Go to Dashboard" : "Analyze a Report"}</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href="#features"
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-5 py-3 rounded-xl transition shadow-2xs"
                >
                  <span>Explore Capabilities</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Automated Biomarker OCR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Explainable Summaries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Private &amp; Patient-Centric</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Refined Interactive Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 text-left space-y-4">
                {/* Header in Preview */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                      <HeartPulse size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Complete Metabolic Panel
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Source: lab_panel_oct.jpg • Extracted
                      </div>
                    </div>
                  </div>
                  <Badge variant="normal" size="sm">
                    Optimal Baseline
                  </Badge>
                </div>

                {/* Key Extracted Markers */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Parsed Biomarkers
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-slate-400 text-[10px] font-medium">Hemoglobin</div>
                      <div className="text-slate-900 font-bold mt-0.5">14.2 g/dL</div>
                      <div className="text-[10px] text-emerald-600 font-medium">13.5 - 17.5 Normal</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-slate-400 text-[10px] font-medium">Fasting Glucose</div>
                      <div className="text-slate-900 font-bold mt-0.5">92 mg/dL</div>
                      <div className="text-[10px] text-emerald-600 font-medium">70 - 99 Normal</div>
                    </div>
                  </div>
                </div>

                {/* AI Synthesis Summary Sample */}
                <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100/70 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-teal-900 text-[11px]">
                    <Sparkles size={12} className="text-teal-600" />
                    <span>AI Synthesis Summary</span>
                  </div>
                  <p className="text-[11px] text-teal-900/80 leading-relaxed">
                    Extracted parameters indicate standard metabolic stability. Liver and renal markers remain within benchmark ranges.
                  </p>
                </div>

                {/* Quick Assistant Teaser */}
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Bot size={13} className="text-teal-600" />
                    <span>Context-linked assistant ready</span>
                  </span>
                  <button
                    onClick={handleStartAnalysis}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MEDICAL DISCLAIMER BANNER ================= */}
      <div className="bg-amber-50/60 border-y border-amber-200/40 py-2.5 px-4 text-center text-xs text-amber-900/80">
        <p className="max-w-4xl mx-auto">
          <strong className="font-semibold text-amber-950">Patient Literacy Notice:</strong> This platform is designed for health report interpretation and educational clarity. It does not provide medical diagnoses or replace physician consultations.
        </p>
      </div>

      {/* ================= CAPABILITIES SECTION ================= */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Badge variant="info" size="sm">
              Core Capabilities
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Designed for effortless report comprehension
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              Every feature is built around patient literacy, data precision, and structured health clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center font-bold">
                <FileCheck2 size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Multimodal OCR</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamlessly uploads pathology images and parses clinical biomarker names, tested values, and reference baselines.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Explainable Synthesis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates clear, patient-friendly summaries explaining what your test values mean without confusing jargon.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center font-bold">
                <Clock size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Longitudinal History</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Preserves all prior analyses in a searchable repository with biomarker status indicators and categorized tags.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center font-bold">
                <Bot size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Interactive Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your selected report context directly into a conversational assistant to ask clarifying questions anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-16 md:py-20 bg-[#f8fafc] border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <Badge variant="neutral" size="sm">
              Workflow
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Four steps from raw scan to clarity
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              A streamlined pipeline designed to deliver answers without unnecessary complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                step: "01",
                title: "Upload Report",
                desc: "Drop standard pathology or diagnostic lab images in JPG or PNG format.",
              },
              {
                step: "02",
                title: "Structured Parsing",
                desc: "OCR extracts specific biomarkers, values, and normal benchmark intervals.",
              },
              {
                step: "03",
                title: "Intelligent Synthesis",
                desc: "AI identifies patterns, flags out-of-range metrics, and outlines lifestyle tips.",
              },
              {
                step: "04",
                title: "Inquire & Review",
                desc: "Discuss specific terms with the assistant and save findings in your history.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative"
              >
                <div className="text-xs font-mono font-bold text-teal-600 mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRIVACY & RESPONSIBILITY ================= */}
      <section id="privacy" className="py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 mx-auto">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Patient Trust &amp; Responsible Health Intelligence
            </h2>
            <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We believe patients deserve to comprehend their laboratory values without fear or confusion.
              Our platform operates strictly as an educational clarity companion—never as an autonomous clinical authority.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50">
              <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Lock size={14} className="text-teal-600" />
                <span>Private Sessions</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Token-authenticated access with isolated report storage per user profile.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50">
              <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Activity size={14} className="text-teal-600" />
                <span>Explainable Baseline</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Translates biochemical terminology into intuitive Plain-English analogies.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50">
              <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-teal-600" />
                <span>Physician Alignment</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Formulates focused questions to take directly to your healthcare appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Activity size={16} />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                Health Intelligence &amp; Report Insights Platform
              </div>
              <div className="text-[11px] text-slate-400">
                Understanding health data with clarity and precision
              </div>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] space-y-1">
            <p>© {new Date().getFullYear()} Health Intelligence &amp; Report Insights Platform.</p>
            <p className="text-slate-400">
              Educational health intelligence. Consult certified physicians for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
