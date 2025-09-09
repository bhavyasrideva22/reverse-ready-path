import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ value, max, className, showPercentage = false }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progress
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-muted-foreground">
            {percentage}%
          </span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}