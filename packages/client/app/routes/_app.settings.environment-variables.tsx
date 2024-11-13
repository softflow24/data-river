import { type MetaFunction } from "@remix-run/node";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@data-river/shared/ui/components/ui/tabs";
import { Button } from "@data-river/shared/ui/components/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "Environment Variables - Data River" }];
};

export default function EnvironmentVariablesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-input pb-0">
        <Tabs defaultValue="variables" className="w-full">
          <TabsList className="inline-flex h-8 items-center w-fit bg-background">
            <TabsTrigger 
              value="variables" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent data-[state=active]:bg-accent"
            >
              Variables
            </TabsTrigger>
            <TabsTrigger 
              value="secrets"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent data-[state=active]:bg-accent"
            >
              Secrets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="variables">
            <div className="grid grid-cols-3 gap-6 pt-6">
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
                      <Button variant="green">
                        New environment variable
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="secrets">
            <div className="grid grid-cols-3 gap-6 pt-6">
              <Card className="col-span-2">
                <CardHeader className="text-center">
                  <CardTitle>Environment Secrets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Manage sensitive environment variables securely.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button variant="green">
                        New environment secret
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 