# Editor Contributions

The editor in Data-River is built using React, allowing users to visually design workflows by dragging and connecting blocks (nodes) in a flowchart-style interface. Contributions to the editor involve creating and maintaining the UI components and handling interactions using libraries like [**React Flow**](https://reactflow.dev/).

This guide will help you get started contributing to the editor.

## Key Components

- **Flow Chart**: The core component for rendering and managing blocks in a workflow.
- **Custom Nodes and Edges**: Extend the default React Flow nodes and edges with custom logic and styles.
- **Panels and Controls**: User interface elements for managing the editor environment, such as side panels and control buttons.

## How to Contribute

1. **Clone the Repository**  
   As always, begin by cloning the Data-River repository.

   ```bash
   git clone https://github.com/softflow24/data-river.git
   cd data-river/packages/editor
   ```

2. **Install Dependencies**  
   Make sure to install the necessary dependencies for the editor package:

   ```bash
   pnpm install
   ```

3. **Run the Editor Locally**  
   Start the development server to see the editor running locally:

   ```bash
   pnpm run dev
   ```

   Open `http://localhost:5173/` in your browser to see the editor in action.

---

## What's Inside?

The editor package is organized into several key components:

- **Flow.tsx**: Manages the overall flow chart, handling node and edge interactions.
- **CustomNode.tsx**: Defines the visual and interactive behavior of custom blocks (nodes).
- **NodeControls.tsx**: Handles the UI for controlling and configuring individual nodes.
- **Panels**: Includes left, right, and bottom panels for managing node properties, logs, and execution results.

---

## Editor Guidelines

- **React Flow**: Most of the flowchart functionality is powered by [**React Flow**](https://reactflow.dev/), so familiarity with this library is helpful when contributing to the editor.
- **UI Components**: The editor uses custom UI components from [**Shadcn**](https://ui.shadcn.com/) such as `Card`, `InputWithLabel`, and `ScrollArea` to ensure consistent styling across the platform.
- **State Management**: The editor state is managed with [**Redux Toolkit**](https://redux-toolkit.js.org/), so contributions should follow best practices for updating and managing global state.

---

## Submitting Contributions

Once you've made your changes, be sure to:

1. Test your changes thoroughly by creating workflows and testing node interactions.
2. Ensure your code adheres to the project’s ESLint and Prettier rules.
3. Submit a pull request to the `development` branch for review.

---

### What's Next?

- [Custom Node Development](contributions/editor/custom-node-development.md)
- [Flow Chart Structure](contributions/editor/flow-chart-structure.md)

---
