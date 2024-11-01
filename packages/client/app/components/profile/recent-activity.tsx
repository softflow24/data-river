import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Created new flow:</span> Data
                  Pipeline {i}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date().setDate(new Date().getDate() - i), "PPP")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
