import React from "react";
import * as Icons from "lucide-react";

interface NodeIconProps {
  icon?: string;
  color: string;
  useBackgroundColor?: boolean;
  useIconColor?: boolean;
}

const NodeIcon: React.FC<NodeIconProps> = ({
  icon,
  color,
  useBackgroundColor,
  useIconColor,
}) => {
  const IconComponent = icon
    ? (Icons[
        icon as keyof typeof Icons
      ] as React.ComponentType<Icons.LucideProps>)
    : Icons.HelpCircle;

  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        padding: "4px",
        backgroundColor: useBackgroundColor ? color : "transparent",
        color: useIconColor ? color : "white",
        borderRadius: "10%",
        margin: "0",
      }}
    >
      <IconComponent style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default NodeIcon;
