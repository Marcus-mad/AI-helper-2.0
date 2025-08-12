import { cn } from "@/lib/utils"

interface SuggestionCardProps {
  title: string
  onClick: () => void
  className?: string
}

export function SuggestionCard({ title, onClick, className }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl bg-gradient-card border border-border hover:border-primary/30",
        "shadow-card hover:shadow-soft transition-all duration-300",
        "text-left group hover:scale-[1.02] active:scale-[0.98]",
        "bg-white/80 backdrop-blur-sm",
        className
      )}
    >
      <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
        {title}
      </p>
    </button>
  )
}