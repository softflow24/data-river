import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";
import { Button } from "@data-river/shared/ui/components/ui/button";

export function VisibilitySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Visibility</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your profile is visible to everyone. You can customize what
          information is shown publicly.
        </p>
        <Button variant="outline" className="w-full mt-4">
          Edit Visibility Settings
        </Button>
      </CardContent>
    </Card>
  );
}
