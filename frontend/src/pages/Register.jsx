import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { PlatformLogo, Button } from "../components/common/UIComponents";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please review and agree to the platform terms and privacy guidelines.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your information and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-800 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Brand Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl mb-6 flex justify-between items-center">
        <Link to="/" className="hover:opacity-90 transition">
          <PlatformLogo />
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Return to Home
        </Link>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Product Identity & Value Presentation */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8 md:p-10 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium">
              <Sparkles size={13} className="text-teal-400" />
              <span>Get Started</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white leading-snug">
                Join the Health Intelligence Platform.
              </h2>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Create your private profile to organize pathology records, view explainable
                laboratory indices, and monitor your personal biomarkers over time.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Private personal archive for all health test results</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Automated biomarker parsing with reference range markers</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Plain-English medical term explanations (ELI5)</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-700/60 mt-8 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-teal-400 shrink-0" />
            <span>Educational literacy platform • Strict patient privacy</span>
          </div>
        </div>

        {/* Right Side: Clean Registration Form */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Start transforming your lab results into actionable health clarity.
            </p>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <span>Registration successful! Redirecting you to sign in...</span>
            </div>
          )}

          {/* Inline Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Dr. / Alex Morgan"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="reg-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create a secure password"
                  required
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 shrink-0"
                />
                <span className="leading-normal">
                  I understand this platform provides educational document insights and
                  does not provide medical diagnoses or replace doctor consultations.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={loading}
                className="w-full justify-center"
              >
                <span>Complete Registration</span>
                {!loading && <ArrowRight size={15} />}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-teal-700 hover:text-teal-800 transition"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}