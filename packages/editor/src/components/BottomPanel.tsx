import { Terminal } from "lucide-react";
import { WorkflowOutputComponent } from "./workflow-output";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@data-river/shared/ui/components/ui/tabs";
import { FilterAndClear } from "./workflow-output/FilterAndClear";

const BottomPanel = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      <Tabs defaultValue="output" className="w-full h-full ">
        <TabsList className="flex justify-between bg-transparent my-1">
          <TabsTrigger value="output">
            <Terminal size={"1rem"} className="mr-2" /> Output
          </TabsTrigger>
          <FilterAndClear />
        </TabsList>
        <TabsContent value="output" className="h-full pb-8 mt-0">
          <WorkflowOutputComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BottomPanel;
