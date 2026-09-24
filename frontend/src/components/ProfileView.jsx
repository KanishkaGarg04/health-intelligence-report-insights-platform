import { useRef, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  ShieldCheck,
  FileBarChart,
  CalendarDays,
  LogOut,
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Badge, Button } from "./common/UIComponents";

export default function ProfileView({ reports = [] }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const reportCount = reports.length;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Active Member";

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("profile", file);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile-picture`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...user,
        profilePic: res.data.profilePic,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Profile picture updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile picture. Please try another image.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with Camera Overlay */}
          <div className="relative shrink-0">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-xs"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-teal-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-xs">
                {initials}
              </div>
            )}

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-full p-2 shadow-sm transition cursor-pointer"
              title="Change Profile Picture"
            >
              <Camera size={14} />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfileUpload}
              hidden
            />
          </div>

          {/* User Details */}
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                {user?.name || "Patient Account"}
              </h1>
              <Badge variant="normal" size="sm">
                <ShieldCheck size={12} />
                <span>Verified Account</span>
              </Badge>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.email || "patient@example.com"}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                <span>Member since {joinedDate}</span>
              </div>
            </div>

            {message && (
              <div className="text-xs text-teal-700 dark:text-teal-400 font-medium pt-1">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Details & Platform History */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Account Information Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-700/60">
            Account Specifications
          </h2>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2">
                <User size={14} />
                <span>Full Name</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {user?.name}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2">
                <Mail size={14} />
                <span>Verified Email</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px]">
                {user?.email}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2">
                <ShieldCheck size={14} />
                <span>Authentication State</span>
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Token Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Platform Engagement Statistics */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-700/60">
            Diagnostic History Metrics
          </h2>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2">
                <FileBarChart size={14} />
                <span>Total Documents Analyzed</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 rounded-md">
                {reportCount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock size={14} />
                <span>Archive Retention</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                Persistent Database
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2">
                <Sparkles size={14} />
                <span>AI Clinical Copilot</span>
              </span>
              <span className="text-teal-700 dark:text-teal-400 font-semibold">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions / Logout */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            End Session
          </h3>
          <p className="text-xs text-slate-400">
            Securely sign out of your profile and remove cached authentication tokens.
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={handleLogout}
          icon={LogOut}
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
}