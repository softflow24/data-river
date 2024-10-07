# Flow Chart Structure

The flow chart in Data-River is the primary visual interface where users design workflows by connecting blocks (nodes) and edges. In Data-River, nodes are generic and flexible, allowing the data they contain to dictate their behavior and appearance. This guide focuses on the structure of the flow chart and how to work with nodes and edges in this context.

## Overview

The flow chart is built using the **React Flow** library, which manages the rendering and state of nodes and edges. The key idea behind the flow chart in Data-River is that **nodes are generic**—their behavior and appearance are driven by the data they contain, rather than custom node types.

---

## Key Components of the Flow Chart

1. **React Flow Component**  
   The core of the flow chart is the `ReactFlow` component from the React Flow library. This component renders the nodes, edges, and manages interactions such as dragging, connecting, and clicking.

   ```typescript
   <ReactFlow
     nodes={nodes}
     edges={edges}
     onNodesChange={eventHandlers.onNodesChangeHandler}
     onEdgesChange={eventHandlers.onEdgesChangeHandler}
     onConnect={eventHandlers.onConnect}
     nodeTypes={nodeTypes} // Always uses the generic 'custom' node type
     edgeTypes={edgeTypes}
     connectionMode={ConnectionMode.Loose}
     minZoom={0.5}
     maxZoom={3}
   >
     <Background />
     <Controls />
   </ReactFlow>
   ```

   In Data-River, the node type is always set to `"custom"`. This allows the same node type to be used for various functions, with the node's data controlling its functionality.

2. **Nodes and Data-Driven Customization**  
   Nodes in the flow chart are generic but highly customizable based on the `data` property. The appearance, inputs, outputs, and controls of a node are determined by the data it contains.

   ```typescript
   const initialNodes: CustomNode[] = [
     {
       id: "2",
       type: "custom",
       position: { x: 400, y: 100 },
       data: {
         block: "input@0.1",
         label: "Input node",
         color: "rgb(234 179 8)",
         sourceHandle: true,
         targetHandle: true,
         icon: "TextCursorInput",
         inputs: { input: "" },
         outputs: { output: "" },
         controls: [
           {
             type: "text",
             label: "Value",
             name: "input",
             placeholder: "Pass to output",
           },
         ],
       },
     },
   ];
   ```

   In the example above, the node's `data` defines its label, color, icon, and controls, which are rendered dynamically in the flow chart.

3. **Node Controls**  
   Nodes can have various controls, such as text inputs or text areas, which are defined in the node's `data.controls` array. These controls allow users to interact with the node and change its inputs or outputs.

   The `NodeControls` component dynamically renders these controls based on the node’s data:

   ```typescript
   const NodeControls: React.FC<NodeControlsProps> = ({ nodeId, controls }) => {
     return controls.map((control, index) => {
       if (control.type === "text") {
         return (
           <InputWithLabel
             key={index}
             label={control.label}
             placeholder={control.placeholder}
             value={control.value}
             onChange={(newValue) => handleInputChange(nodeId, control.name, newValue)}
           />
         );
       }
       // Handle other control types...
     });
   };
   ```

4. **Edges and Connections**  
   Edges represent the connections between nodes. Just like nodes, the edges in Data-River are generic, with their type always set to `"custom"`. This ensures consistent behavior for all edges.

   ```typescript
   const initialEdges: Edge[] = [
     { id: "e1-2", source: "1", target: "2", type: "custom" },
   ];
   ```

   The edges are responsible for directing the flow of data between nodes, and they are updated dynamically as users connect or disconnect nodes in the flow.

5. **Event Handlers**  
   Several event handlers manage user interactions with nodes and edges, such as dragging nodes, clicking on them, or connecting nodes together. These event handlers are defined in `useReactFlowEventHandlers()` and are passed to the `ReactFlow` component.

   ```typescript
   const eventHandlers = useReactFlowEventHandlers();

   <ReactFlow
     onNodesChange={eventHandlers.onNodesChangeHandler}
     onEdgesChange={eventHandlers.onEdgesChangeHandler}
     onConnect={eventHandlers.onConnect}
   />
   ```

---

## Working with Nodes and Data

### Node Data Structure

The structure of the node's `data` property defines the behavior and appearance of each node. Here's an example of an `Input` node's data:

```typescript
data: {
  block: "input@0.1",
  label: "Input node",
  color: "rgb(234 179 8)",
  sourceHandle: true,
  targetHandle: true,
  icon: "TextCursorInput",
  inputs: { input: "" },
  outputs: { output: "" },
  controls: [
    {
      type: "text",
      label: "Value",
      name: "input",
      placeholder: "Pass to output",
    },
  ],
}
```

The `controls` array defines the UI elements that the user can interact with to modify the node's behavior.

### Dynamic Node Rendering

The `CustomNode` component renders nodes dynamically based on their data. It displays the node's label, icon, and controls, and it manages input/output connections using `SourceHandle` and `TargetHandle`.

```typescript
const CustomNode: React.FC<NodeProps<NodeData>> = ({ id, data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.label}</CardTitle>
        <NodeIcon icon={data.icon} />
      </CardHeader>
      <CardContent>
        <NodeControls nodeId={id} controls={data.controls} />
      </CardContent>
      {data.sourceHandle && <SourceHandle />}
      {data.targetHandle && <TargetHandle />}
    </Card>
  );
};
```

### Node Controls and Interaction

The `NodeControls` component dynamically generates the controls for each node based on its `data.controls` configuration. This allows for flexible user interaction with the nodes without needing to create custom node types for each use case.

---

## Best Practices

- **Keep Node Data Simple**: Since nodes are generic, ensure that the `data` property is concise and easy to manage.
- **Use Controls Efficiently**: Leverage the `controls` array to allow users to interact with nodes and adjust their behavior dynamically.
- **Focus on Data-Driven Logic**: Avoid creating new node types. Instead, focus on how the node data can be used to drive the rendering and behavior of each node in the flow.

---

### What's Next?

- [Custom Node Development](contributions/editor/custom-node-development.md)
- [How to Contribute](contributions/editor/editor-contribution.md)

---
