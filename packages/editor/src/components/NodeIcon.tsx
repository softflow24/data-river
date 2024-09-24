import React from "react";
import * as Icons from "lucide-react";

interface NodeIconProps {
  icon?: string;
  color: string;
  minimalistic: boolean;
}

const NodeIcon: React.FC<NodeIconProps> = ({ icon, color, minimalistic }) => {
  const IconComponent = icon
    ? Icons[icon as keyof typeof Icons]
    : Icons.HelpCircle;

  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        padding: "4px",
        backgroundColor: minimalistic ? color : "transparent",
        color: "white",
        borderRadius: "10%",
      }}
    >
      <IconComponent style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default NodeIcon;
