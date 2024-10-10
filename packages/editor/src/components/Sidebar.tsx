import React from "react";
import { Square, Circle, Triangle } from "lucide-react";

const nodeTypes = [
  { type: "input", label: "Input Node", icon: Square },
  { type: "default", label: "Default Node", icon: Circle },
  { type: "output", label: "Output Node", icon: Triangle },
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Node Types</h2>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center p-2 bg-white rounded shadow cursor-move"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            <node.icon className="mr-2" size={20} />
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
