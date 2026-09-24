import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { PlatformLogo, Button } from "../components/common/UIComponents";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please verify your credentials and try again."
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
        {/* Left Side: Product Identity & Calming Health-Tech Narrative */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8 md:p-10 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium">
              <Sparkles size={13} className="text-teal-400" />
              <span>Secure Clinical Workspace</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white leading-snug">
                Precision intelligence for your laboratory reports.
              </h2>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Log in to review extracted clinical biomarkers, read structured synthesis
                digests, and query your historical records.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Encrypted token authentication and private session storage</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Instant multimodal OCR extraction on lab records</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Context-connected AI consultation assistant</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-700/60 mt-8 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-teal-400 shrink-0" />
            <span>Educational literacy platform • Strict patient privacy</span>
          </div>
        </div>

        {/* Right Side: Clean Login Form */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your verified email and password to access your health records.
            </p>
          </div>

          {/* Inline Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
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
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Password
                </label>
                <span className="text-[11px] text-teal-700 hover:text-teal-800 cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>Remember me on this browser</span>
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
                <span>Sign in to Platform</span>
                {!loading && <ArrowRight size={15} />}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account yet?{" "}
              <Link
                to="/register"
                className="font-semibold text-teal-700 hover:text-teal-800 transition"
              >
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}