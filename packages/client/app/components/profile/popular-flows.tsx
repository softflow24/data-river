import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { GitFork, Star, Users } from "lucide-react";

export function PopularFlows() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Popular Flows
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GitFork className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Data Transformation Flow {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated 2 days ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span className="text-sm">{42 * i}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{12 * i}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
