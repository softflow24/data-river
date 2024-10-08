import React from "react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import { Trash2 } from "lucide-react";

interface ActionsSectionProps {
  onDeleteNode: () => void;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ onDeleteNode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant="destructive" onClick={onDeleteNode}>
          <Trash2 className="h-4 w-4 mr-2" /> Delete Node
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionsSection;
