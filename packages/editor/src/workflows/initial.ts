import { Edge, Node } from "reactflow";
import { type NodeData } from "@/types/NodeTypes";
import { blockConfigs } from "@/blocks";
import { type EdgeData } from "@/types/EdgeTypes";
import { createHandles } from "@/utils/nodeCreated";
import { type Handle } from "@/types/HandleTypes";
import { createEdge, SimpleEdgeConfig } from "@/utils/createEdge";

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
    position: { x: 400, y: 400 },
  },
  {
    ...blockConfigs.openai,
    id: "98-openai",
    position: { x: 800, y: 400 },
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

const edgeConfigs: SimpleEdgeConfig[] = [
  {
    source: "1-start",
    target: "2-input",
    sourceProperty: "started",
    targetProperty: "trigger",
  },
  {
    source: "2-input",
    target: "5-logic",
    sourceProperty: "value",
    targetProperty: "value",
  },
  {
    source: "5-logic",
    target: "3-input",
    sourceProperty: "result",
    targetProperty: "trigger",
    condition: "if",
  },
  {
    source: "5-logic",
    target: "6-input",
    sourceProperty: "result",
    targetProperty: "trigger",
    condition: "else",
  },
  {
    source: "6-input",
    target: "9-output",
    sourceProperty: "value",
    targetProperty: "value",
  },
  {
    source: "3-input",
    target: "9-output",
    sourceProperty: "value",
    targetProperty: "value",
  },
  {
    source: "9-output",
    target: "4-end",
    sourceProperty: "value",
    targetProperty: "value",
  },
];

const initialHandles: Handle[] = initialNodes.flatMap(createHandles);

const initialEdges: Edge<EdgeData>[] = edgeConfigs.map((config) =>
  createEdge(
    config,
    initialNodes.map((node) => node.data),
    initialHandles,
  ),
);

export { initialNodes, initialEdges, initialHandles };
