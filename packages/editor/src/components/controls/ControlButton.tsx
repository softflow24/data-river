import React, { FC, ReactNode } from "react";

interface ControlButtonProps {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
}

const ControlButton: FC<ControlButtonProps> = ({
  onClick,
  children,
  active = false,
}) => {
  const baseClass = active ? "p-1" : "text-gray-600 hover:text-gray-800 p-1";
  const activeClass = active ? "text-blue-500 bg-blue-100 rounded-md" : "";

  return (
    <button className={`${baseClass} ${activeClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ControlButton;
