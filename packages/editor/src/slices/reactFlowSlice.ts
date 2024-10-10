import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Viewport,
} from "reactflow";
import { NodeData } from "../types/NodeTypes";
import { applyDataChanges, NodeDataChange } from "../utils/nodesUpdates";
import _ from "lodash";
import { nodeConfigs, NodeType } from "../nodes";

type CustomNode = Node<NodeData>;

export interface ReactFlowState {
  minimalistic: boolean;
  lightTheme: boolean;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  selectedEdgeId: string | null;
  hoveredEdgeId: string | null;
  nodes: CustomNode[];
  edges: Edge[];
  viewport: Viewport;
  isSheetOpen: boolean;
}

const initialNodes: CustomNode[] = [
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
      inputs: { value: "" },
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

const initialState: ReactFlowState = {
  minimalistic: false,
  lightTheme: false,
  selectedNodeId: null,
  hoveredNodeId: null,
  selectedEdgeId: null,
  hoveredEdgeId: null,
  nodes: initialNodes,
  edges: initialEdges,
  viewport: { x: 0, y: 0, zoom: 1 },
  isSheetOpen: false,
};

const reactFlowSlice = createSlice({
  name: "reactFlow",
  initialState,
  reducers: {
    toggleMinimalistic: (state) => {
      state.minimalistic = !state.minimalistic;
    },
    toggleLightTheme: (state) => {
      state.lightTheme = !state.lightTheme;
    },
    setSelectedNodeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEdgeId = null;
      state.selectedNodeId = action.payload;
    },
    setHoveredNodeId: (state, action: PayloadAction<string | null>) => {
      state.hoveredNodeId = action.payload;
    },
    setSelectedEdgeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEdgeId = action.payload;
    },
    setHoveredEdgeId: (state, action: PayloadAction<string | null>) => {
      state.hoveredEdgeId = action.payload;
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    updateNodes: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    updateNodesData: (state, action: PayloadAction<NodeDataChange[]>) => {
      state.nodes = applyDataChanges(action.payload, state.nodes);
    },
    updateEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.viewport = { ...state.viewport, zoom: action.payload };
    },
    zoomIn: (state) => {
      state.viewport = { ...state.viewport, zoom: state.viewport.zoom + 0.1 };
    },
    zoomOut: (state) => {
      state.viewport = { ...state.viewport, zoom: state.viewport.zoom - 0.1 };
    },
    addNewNode: (
      state,
      action: PayloadAction<{
        type: NodeType;
        position: { x: number; y: number };
      }>,
    ) => {
      const { type, position } = action.payload;
      const nodeConfig = nodeConfigs[type];

      if (!nodeConfig) {
        throw new Error(`Unknown node type: ${type}`);
      }

      const newNode: CustomNode = {
        id: _.uniqueId("node-"),
        type: nodeConfig.type,
        position,
        data: { ...nodeConfig.data },
      };

      state.nodes.push(newNode);
    },
    setViewport: (state, action: PayloadAction<Viewport>) => {
      if (action.payload.x !== undefined) {
        state.viewport.x = action.payload.x;
      }
      if (action.payload.y !== undefined) {
        state.viewport.y = action.payload.y;
      }
      if (action.payload.zoom !== undefined) {
        state.viewport.zoom = action.payload.zoom;
      }
    },
    setIsSheetOpen: (state, action: PayloadAction<boolean>) => {
      state.isSheetOpen = action.payload;
    },
  },
});

export const {
  toggleMinimalistic,
  toggleLightTheme,
  setSelectedNodeId,
  setHoveredNodeId,
  setNodes,
  updateNodes,
  updateEdges,
  setEdges,
  setSelectedEdgeId,
  setHoveredEdgeId,
  setViewport,
  setIsSheetOpen,
  updateNodesData,
  addNewNode,
} = reactFlowSlice.actions;

export default reactFlowSlice.reducer;
