import { type MetaFunction } from "@remix-run/node";
import { useNavigate, Outlet, useLocation } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import { Button } from "@data-river/shared/ui/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "Environment Secrets - Data River" }];
};

export default function EnvironmentSecretsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewRoute = location.pathname.endsWith('/new');

  return (
    <div>
      <Outlet />

      {!isNewRoute && (
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader className="text-center">
              <CardTitle>Environment Secrets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Add and manage sensitive environment secrets securely for your project.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="green"
                    onClick={() => navigate("new")}//todo: it should get its own form component
                  >
                    New secret
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 