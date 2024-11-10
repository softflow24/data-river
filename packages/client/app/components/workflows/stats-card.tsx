import { type ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
};

export function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
