import { Card } from "@data-river/shared/ui/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, GitFork, Play, Star } from "lucide-react";
import { cn } from "@data-river/shared/ui/utils";

export function RecentEvents() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Recent Events</h3>
      <div className="space-y-3">
        <AnimatePresence>
          {generateMockEvents().map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                "border border-transparent",
                i === 0 && "bg-primary/5 border-primary/10",
              )}
            >
              {event.icon}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {event.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.time}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function generateMockEvents() {
  return [
    {
      id: 1,
      icon: <Play className="w-4 h-4 text-green-500" />,
      title: "Workflow executed successfully",
      time: "2 minutes ago",
    },
    {
      id: 2,
      icon: <GitFork className="w-4 h-4 text-blue-500" />,
      title: "Workflow remixed by John Doe",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      title: "Execution failed - Timeout",
      time: "3 hours ago",
    },
    {
      id: 4,
      icon: <Star className="w-4 h-4 text-amber-500" />,
      title: "Added to favorites",
      time: "1 day ago",
    },
  ];
}
