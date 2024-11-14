import { type MetaFunction } from "@remix-run/node";
import { NavLink, useNavigate, Link, Outlet, useLocation } from "@remix-run/react";
import React from "react";
import { cn } from "@data-river/shared/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import { Button } from "@data-river/shared/ui/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "Environment Variables - Data River" }];
};

export default function EnvironmentVariablesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewRoute = location.pathname.endsWith('/new');
  const isSecretsRoute = location.pathname.includes('/secrets');

  return (
    <div className="space-y-6">
      <div className="border-b border-input pb-0">
        <div className="inline-flex h-8 items-center w-fit bg-background gap-1">
          <NavLink 
            to="/settings/environment-variables"
            className={({ isActive }) =>
              cn(
                "px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-md",
                (isActive && !isSecretsRoute) && "bg-accent"
              )
            }
          >
            Variables
          </NavLink>
          <NavLink 
            to="/settings/environment-variables/secrets"
            className={({ isActive }) =>
              cn(
                "px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-md",
                isActive && "bg-accent"
              )
            }
          >
            Secrets
          </NavLink>
        </div>
      </div>

      <Outlet />

      {!isNewRoute && !isSecretsRoute && (
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader className="text-center">
              <CardTitle>Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Add and manage environment variables for your project.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="green"
                    onClick={() => navigate("new")}
                  >
                    New environment variable
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