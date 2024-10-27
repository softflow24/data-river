import { Edge, Node } from "reactflow";
import { type NodeData } from "@/types/NodeTypes";
import { blockConfigs } from "@/blocks";
import { type EdgeData } from "@/types/EdgeTypes";

const initialNodes: Node<NodeData>[] = [
  {
    ...blockConfigs.start,
    id: "1-start",
    position: { x: 100, y: 100 },
  },
  {
    ...blockConfigs.input,
    id: "2-input",
    position: { x: 400, y: 100 },
    data: {
      ...blockConfigs.input.data,
      config: { input: "100" },
    },
  },
  {
    ...blockConfigs.request,
    id: "99-request",
    position: { x: 400, y: 300 },
  },
  {
    ...blockConfigs.openai,
    id: "98-openai",
    position: { x: 800, y: 300 },
  },
  {
    ...blockConfigs.input,
    id: "3-input",
    position: { x: 1300, y: 0 },
    data: {
      ...blockConfigs.input.data,
      config: { input: "logic was resolved to TRUE" },
    },
  },
  {
    ...blockConfigs.logic,
    id: "5-logic",
    position: { x: 800, y: 100 },
  },

  {
    ...blockConfigs.input,
    id: "6-input",
    position: { x: 1300, y: 300 },
    data: {
      ...blockConfigs.input.data,
      config: { input: "logic was resolved to FALSE" },
    },
  },

  {
    ...blockConfigs.output,
    id: "9-output",
    position: { x: 1800, y: 150 },
  },

  {
    ...blockConfigs.end,
    id: "4-end",
    position: { x: 2300, y: 200 },
  },
];

const initialEdges: Edge<EdgeData>[] = [
  {
    id: "e1-2",
    source: "1-start",
    target: "2-input",
    type: "custom",
    sourceHandle: "1-start-source",
    targetHandle: "2-input-target",
    data: {
      sourceProperty: "started",
      sourceType: "boolean",
      targetProperty: "trigger",
      targetType: "boolean",
    },
  },
  {
    id: "e2-5",
    source: "2-input",
    target: "5-logic",
    type: "custom",
    sourceHandle: "2-input-source",
    targetHandle: "5-logic-target",
    data: {
      sourceProperty: "value",
      sourceType: "string",
      targetProperty: "value",
      targetType: "string",
    },
  },
  {
    id: "e5-3",
    source: "5-logic",
    target: "3-input",
    type: "custom",
    sourceHandle: "5-logic-if-handle",
    targetHandle: "3-input-target",
    data: {
      sourceProperty: "value",
      sourceType: "string",
      targetProperty: "trigger",
      targetType: "boolean",
    },
  },
  {
    id: "e6-3",
    source: "5-logic",
    target: "6-input",
    type: "custom",
    sourceHandle: "5-logic-else-handle",
    targetHandle: "6-input-target",
    data: {
      sourceProperty: "value",
      sourceType: "string",
      targetProperty: "trigger",
      targetType: "boolean",
    },
  },
  {
    id: "e6-9",
    source: "6-input",
    target: "9-output",
    type: "custom",
    sourceHandle: "6-input-source",
    targetHandle: "9-output-target",
    data: {
      sourceProperty: "value",
      sourceType: "string",
      targetProperty: "value",
      targetType: "string",
    },
  },
  {
    id: "e3-4",
    source: "3-input",
    target: "9-output",
    type: "custom",
    sourceHandle: "3-input-source",
    targetHandle: "9-output-target",
    data: {
      sourceProperty: "value",
      sourceType: "string",
      targetProperty: "value",
      targetType: "string",
    },
  },
  {
    id: "e9-4",
    source: "9-output",
    target: "4-end",
    type: "custom",
    sourceHandle: "9-output-source",
    targetHandle: "4-end-target",
    data: {
      sourceProperty: "value",
      sourceType: "string",
      targetProperty: "value",
      targetType: "string",
    },
  },
];

export { initialNodes, initialEdges };
