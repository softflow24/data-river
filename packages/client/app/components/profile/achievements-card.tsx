import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";

export function AchievementsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">Flows Created</div>
          </div>
          <div>
            <div className="text-2xl font-bold">3.2k</div>
            <div className="text-xs text-muted-foreground">Flow Runs</div>
          </div>
          <div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">Templates</div>
          </div>
          <div>
            <div className="text-2xl font-bold">142</div>
            <div className="text-xs text-muted-foreground">Contributions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
