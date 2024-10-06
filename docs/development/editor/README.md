# Editor Development Overview

The Data-River editor allows users to create and manage workflows visually by connecting blocks (nodes) and edges. The editor is designed to be generic and data-driven, meaning that blocks dynamically adjust based on the data provided to them rather than relying on custom node or edge types.

This guide provides an overview of the editor architecture, key components, and how contributors can make meaningful enhancements to the editor interface without needing to create new node or edge types.

---

## Key Features

1. **Generic Node Architecture**  
   The editor uses a single **custom node** type. The behavior and appearance of the node are defined entirely by its data, such as inputs, outputs, labels, and controls. This allows flexibility in how each node operates within the workflow.

2. **Dynamic Controls and Interfaces**  
   The controls (such as input fields) inside a node are generated dynamically based on the `controls` property in the node's data. This makes it easy to customize how users interact with the blocks without altering the underlying node structure.

3. **React Flow Integration**  
   The editor leverages [**React Flow**](https://reactflow.dev/) for managing the flowchart rendering, user interactions (dragging, connecting), and event handling. React Flow simplifies the management of nodes and edges, allowing contributors to focus on the functionality of the workflow itself.

---

## Important Files

- **Flow.tsx**  
  The main component responsible for rendering the workflow. This includes managing the nodes and edges, as well as handling various events such as node clicks and connections.

- **CustomNode.tsx**  
  Defines how each block (node) is displayed. The `CustomNode` component is highly flexible, dynamically rendering controls, labels, and icons based on the node's data.

- **NodeControls.tsx**  
  Handles the logic for rendering and interacting with the controls inside each block (node). Controls such as text inputs or text areas are generated based on the node's `controls` property.

---

## Extending the Editor

The editor is designed to be extensible without requiring new node types. Instead, contributors should focus on modifying the **node data structure** to:

- Add new inputs, outputs, or controls to nodes.
- Adjust the appearance of nodes based on their data properties (e.g., changing labels, colors, icons).
- Handle new types of dynamic interactions within nodes.

---

## Related Guides

- [Flow Chart Structure](development/editor/flow-chart-structure.md)  
  Learn about how the flow chart is structured and how nodes and edges are managed within React Flow.

- [Custom Node Development](development/editor/custom-node-development.md)  
  Understand how to work with and modify the generic custom nodes that power the workflows.

- [Editor Contributions](development/editor/editor-contribution.md)  
  A step-by-step guide on how to contribute to the editor, including setup instructions and guidelines for submitting pull requests.

---

The Data-River editor is in continuous development, and we encourage contributions that enhance its functionality, usability, and flexibility. Please explore the related guides for more detailed information on how to contribute effectively.
