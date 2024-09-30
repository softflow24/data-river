import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, setNodes } from "../store";
import { setIsSheetOpen } from "../store";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditNodeSheetProps {}

const EditNodeSheet: React.FC<EditNodeSheetProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.app.nodes);
  const selectedNodeId = useSelector(
    (state: RootState) => state.app.selectedNodeId,
  );
  const isOpen = useSelector((state: RootState) => state.app.isSheetOpen);

  const [nodeName, setNodeName] = useState("");
  const [nodeDescription, setNodeDescription] = useState("");

  React.useEffect(() => {
    if (selectedNodeId) {
      const selectedNode = nodes.find((node) => node.id === selectedNodeId);
      if (selectedNode) {
        setNodeName(selectedNode.data.label || "");
        setNodeDescription(selectedNode.data.description || "");
      }
    }
  }, [selectedNodeId, nodes]);

  const handleSubmit = useCallback(() => {
    if (!selectedNodeId) {
      return;
    }

    const selectedNode = nodes.find((x) => x.id === selectedNodeId);
    if (!selectedNode) {
      return;
    }

    const updatedNodes = nodes.map((node) =>
      node.id === selectedNodeId
        ? {
            ...node,
            data: {
              ...node.data,
              label: nodeName,
              description: nodeDescription,
            },
          }
        : node,
    );

    dispatch(setNodes(updatedNodes));
    dispatch(setIsSheetOpen(false));
  }, [selectedNodeId, nodeName, nodeDescription, nodes, dispatch]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => dispatch(setIsSheetOpen(open))}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Node</SheetTitle>
          <SheetDescription>
            Make changes to the selected node.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="description"
              value={nodeDescription}
              onChange={(e) => setNodeDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetClose asChild>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default EditNodeSheet;
