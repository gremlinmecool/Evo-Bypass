import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  target,
  rel
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold transition duration-200",
    variant === "primary" &&
      "border-[#0f172a] bg-[#111827] text-white shadow-[0_10px_24px_rgba(15,23,42,0.14)] hover:-translate-y-0.5 hover:bg-[#0b1220] dark:border-white/10 dark:bg-white dark:text-slate-900",
    variant === "secondary" &&
      "border-[color:var(--border-color)] bg-[color:var(--card-solid)] text-[color:var(--text-primary)] hover:-translate-y-0.5 hover:bg-white/95 dark:bg-white/5",
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
