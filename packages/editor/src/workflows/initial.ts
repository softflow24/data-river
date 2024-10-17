import { Edge, Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      block: "start@0.1",
      label: "Start",
      color: "rgb(34 197 94)",
      sourceHandle: true,
      targetHandle: false,
      icon: "Play",
    },
  },
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
      inputs: {},
      config: {
        input: "100",
      },
      outputs: {
        output: "",
      },
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
  {
    id: "3",
    type: "custom",
    position: { x: 1300, y: 0 },
    data: {
      block: "input@0.1",
      label: "Input",
      color: "rgb(234 179 8)",
      sourceHandle: true,
      targetHandle: true,
      icon: "Square",
      config: {
        input: "logic was resolved to TRUE",
      },
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
  {
    id: "5",
    type: "custom",
    position: { x: 800, y: 100 },
    data: {
      block: "logic@0.1",
      label: "Logic",
      color: "rgb(59 130 246)",
      sourceHandle: false,
      targetHandle: true,
      icon: "GitBranch",
      outputs: {
        result: "",
      },
      config: {
        logicOperator: "AND",
        conditions: [],
      },
      controls: [
        {
          type: "conditions-summary",
          label: "Conditions summary",
          name: "conditions",
        },
      ],
    },
  },

  {
    id: "6",
    type: "custom",
    position: { x: 1300, y: 300 },
    data: {
      block: "input@0.1",
      label: "Input",
      color: "rgb(234 179 8)",
      sourceHandle: true,
      targetHandle: true,
      icon: "Square",
      config: {
        input: "logic was resolved to FALSE",
      },
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

  {
    id: "9",
    type: "custom",
    position: { x: 1800, y: 150 },
    data: {
      block: "output@0.1",
      label: "Output",
      color: "rgb(234 179 8)",
      sourceHandle: true,
      targetHandle: true,
      icon: "Square",
      controls: [
        {
          label: "",
          type: "text-area",
          name: "output",
          placeholder:
            "Value from input will be displayed here after execution",
        },
      ],
    },
  },

  {
    id: "4",
    type: "custom",
    position: { x: 2300, y: 200 },
    data: {
      block: "end@0.1",
      label: "End",
      color: "rgb(239 68 68)",
      sourceHandle: false,
      targetHandle: true,
      icon: "Flag",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "custom",
    sourceHandle: "1-source",
    targetHandle: "2-target",
  },

  {
    id: "e2-5",
    source: "2",
    target: "5",
    type: "custom",
    sourceHandle: "2-source",
    targetHandle: "5-target",
  },
  {
    id: "e5-3",
    source: "5",
    target: "3",
    type: "custom",
    sourceHandle: "5-if-handle",
    targetHandle: "3-target",
  },
  {
    id: "e6-3",
    source: "5",
    target: "6",
    type: "custom",
    sourceHandle: "5-else-handle",
    targetHandle: "6-target",
  },
  {
    id: "e6-9",
    source: "6",
    target: "9",
    type: "custom",
    sourceHandle: "6-source",
    targetHandle: "9-target",
  },
  {
    id: "e3-4",
    source: "3",
    target: "9",
    type: "custom",
    sourceHandle: "9-source",
    targetHandle: "9-target",
  },
  {
    id: "e9-4",
    source: "9",
    target: "4",
    type: "custom",
    sourceHandle: "9-source",
    targetHandle: "4-target",
  },
];

export { initialNodes, initialEdges };
