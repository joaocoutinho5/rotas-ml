import { Check, Copy } from "lucide-react";
import Button from "./ui/button";

interface MessageBlockProps {
  label: string;
  message: string;
  onCopy: () => void;
  copied: boolean;
  hasResult: boolean;
  variant: "onprimary" | "muted";
}

export default function MessageBlock({
  label,
  message,
  onCopy,
  copied,
  hasResult,
  variant,
}: MessageBlockProps) {
  return (
    <div className="space-y-2">
      <p
        className={`text-xs uppercase tracking-wider font-medium pl-1 ${
          variant === "onprimary"
            ? "text-[hsl(var(--primary-foreground))]/80"
            : "text-[hsl(var(--muted-foreground))]"
        }`}
      >
        {label}
      </p>

      <div
        className={`rounded-2xl flex items-stretch gap-2 p-2 pl-4 ${
          variant === "onprimary"
            ? "bg-[hsl(var(--primary-foreground))]/15 backdrop-blur-sm"
            : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
        }`}
      >
        <p className="flex-1 self-center text-sm leading-relaxed font-medium truncate">
          {message}
        </p>

        <Button
          type="button"
          onClick={onCopy}
          disabled={!hasResult}
          size="icon"
          className={`shrink-0 h-10 w-10 rounded-xl transition-bounce ${
            copied
              ? "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] scale-95"
              : "bg-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground))]/90 text-[hsl(var(--background))] hover:scale-105"
          } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`}
          aria-label={copied ? "Copiado" : "Copiar mensagem"}
        >
          {copied ? (
            <Check className="w-4 h-4 animate-pop-in" strokeWidth={3} />
          ) : (
            <Copy className="w-4 h-4" strokeWidth={2.5} />
          )}
        </Button>
      </div>
    </div>
  );
}
