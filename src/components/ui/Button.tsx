import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-neutral-950 hover:bg-neutral-200 border border-white/10",
  secondary:
    "bg-white/0 text-white hover:bg-white/10 border border-white/15",
  ghost:
    "bg-transparent text-neutral-200 hover:text-white hover:bg-white/5 border border-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

export function Button({
  href,
  className,
  variant = "primary",
  size = "md",
  external,
  download,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:translate-y-px",
    variants[variant],
    sizes[size],
    className,
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        download={download}
        {...props}
      />
    );
  }

  return <Link href={href} className={classes} {...props} />;
}

