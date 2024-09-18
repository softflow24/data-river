import { ReactFlowProvider } from "reactflow";

import Flow from "./components/flow";

const EnhancedNodeEditor = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default EnhancedNodeEditor;
