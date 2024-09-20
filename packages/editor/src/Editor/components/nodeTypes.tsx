import CustomNode, { NodeData } from "./customNode";

interface NodeProps {
  data: NodeData;
  isMinimalist: boolean;
}

export const nodeTypes = {
  start: (props: NodeProps) => <CustomNode {...props} type="start" />,
  input: (props: NodeProps) => <CustomNode {...props} type="input" />,
  logic: (props: NodeProps) => <CustomNode {...props} type="logic" />,
  output: (props: NodeProps) => <CustomNode {...props} type="output" />,
  end: (props: NodeProps) => <CustomNode {...props} type="end" />,
};
