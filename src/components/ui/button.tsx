import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-signal text-paper hover:bg-signal/90 border border-signal",
  outline: "bg-transparent text-ink border border-line-strong hover:border-signal hover:text-signal",
  ghost: "bg-transparent text-ink border border-transparent hover:text-signal",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn("inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-tight transition-colors duration-200", variantStyles[variant], sizeStyles[size], className);
}

interface ButtonAsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> { href?: undefined; variant?: ButtonVariant; size?: ButtonSize; }
interface ButtonAsLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> { href: string; variant?: ButtonVariant; size?: ButtonSize; }
type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    if ("href" in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink;
      return <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={buttonClasses(variant, size, className)} {...rest} />;
    }
    return <button ref={ref as React.Ref<HTMLButtonElement>} className={buttonClasses(variant, size, className)} {...(props as ButtonAsButton)} />;
  }
);
Button.displayName = "Button";
