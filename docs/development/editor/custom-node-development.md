# Custom Node Development

In Data-River, nodes (blocks) are customizable React components. Each node can have its own visual representation, input/output handles, and configurable settings.

This guide will walk you through how to create a custom node for the Data-River editor.

## Node Structure

A node consists of the following elements:

1. **NodeProps**: Props passed from React Flow containing node-specific data.
2. **Input and Output Handles**: Used for connecting the node to other nodes in the workflow.
3. **Node UI**: Visual representation, including controls, icons, and labels.

### Example Custom Node

Here’s a basic example of a custom node:

```typescript
import React from "react";
import { NodeProps } from "reactflow";
import SourceHandle from "./SourceHandle";
import TargetHandle from "./TargetHandle";

const CustomNode: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <div className="custom-node">
      <TargetHandle />
      <div className="node-content">
        <h3>{data.label}</h3>
        <p>{data.description}</p>
      </div>
      <SourceHandle />
    </div>
  );
};

export default CustomNode;
```

---

## How to Use Custom Nodes

1. **Define the Node**
   Create your node by defining a React component that extends `NodeProps` from React Flow. Add any custom UI elements and define how the node will appear and behave.

2. **Handle Inputs and Outputs**
   Use `SourceHandle` and `TargetHandle` components to define where connections can be made to and from this node.

3. **Register the Node**
   Once the node is created, register it in `Flow.tsx` by adding it to the `nodeTypes` object or just use the default type custom:

   ```typescript
   const nodeTypes = {
     custom: CustomNode,
   };
   ```

4. **Test Your Node**
   Run the editor locally and test your custom node by adding it to a workflow. Ensure that the input/output handles work as expected.

---

## Best Practices

- **Keep It Simple**: Nodes should be simple and intuitive to use.
- **UI Consistency**: Ensure that your node matches the styling of other nodes in the platform.
- **Handle Errors Gracefully**: Use error handling to ensure that the node behaves correctly even if invalid inputs are provided.

---

### What's Next?

- [Flow Chart Structure](contributions/editor/flow-chart-structure.md)
- [How to Contribute](contributions/editor/editor-contribution.md)

---
