import { Loader2 } from "lucide-react";

/**
 * Status Badge Component
 */
export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
}) {
  const variantStyles = {
    normal:
      "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60",
    abnormal:
      "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60",
    critical:
      "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60",
    info:
      "bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60",
    neutral:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-semibold",
    lg: "text-sm px-3 py-1.5 font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase ${
        variantStyles[variant] || variantStyles.neutral
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Unified Button Component
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon: Icon,
  className = "",
  disabled,
  ...props
}) {
  const variantStyles = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 dark:bg-teal-600 dark:hover:bg-teal-500 shadow-sm",
    secondary:
      "bg-teal-50 text-teal-800 hover:bg-teal-100 active:bg-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:hover:bg-teal-900/60",
    outline:
      "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-xs",
    ghost:
      "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    danger:
      "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50 border border-rose-200/60 dark:border-rose-900",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5 font-medium",
    md: "text-sm px-4 py-2.5 rounded-xl gap-2 font-medium",
    lg: "text-base px-5 py-3 rounded-xl gap-2.5 font-semibold",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
        variantStyles[variant] || variantStyles.primary
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin text-current shrink-0" />
      ) : Icon ? (
        <Icon size={16} className="shrink-0" />
      ) : null}
      {children}
    </button>
  );
}

/**
 * Standard Card Container
 */
export function Card({
  children,
  className = "",
  hover = false,
  padding = "p-6",
  ...props
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${padding} ${
        hover
          ? "hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all duration-200"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Section Header Component
 */
export function SectionHeader({
  title,
  subtitle,
  badge,
  action,
  className = "mb-6",
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div>
        {badge && <div className="mb-1.5">{badge}</div>}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * Canonical Platform Identity Component
 */
export function PlatformLogo({
  collapsed = false,
  size = "md",
  className = "",
}) {
  const iconSizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-9 h-9 rounded-xl",
    lg: "w-11 h-11 rounded-xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${iconSizeClasses[size] || iconSizeClasses.md} bg-gradient-to-tr from-teal-600 via-teal-500 to-blue-600 flex items-center justify-center text-white shadow-xs shrink-0`}
      >
        <svg
          className="w-5 h-5 stroke-white fill-none"
          viewBox="0 0 24 24"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>

      {!collapsed && (
        <div className="leading-tight">
          <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Health Intelligence</span>
          </div>
          <div className="text-[11px] font-medium text-slate-400 tracking-normal">
            Report Insights Platform
          </div>
        </div>
      )}
    </div>
  );
}
