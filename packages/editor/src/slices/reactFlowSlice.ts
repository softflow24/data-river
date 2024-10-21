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
import _ from "lodash";
import { NodeData } from "@/types/NodeTypes";
import { applyDataChanges, NodeDataChange } from "@/utils/nodesUpdates";
import { blockConfigs, BlockType } from "@/blocks";
import { initialEdges, initialNodes } from "@/workflows/initial";

type CustomNode = Node<NodeData>;

export interface ReactFlowState {
  minimalistic: boolean;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  selectedEdgeId: string | null;
  hoveredEdgeId: string | null;
  nodes: CustomNode[];
  edges: Edge[];
  viewport: Viewport;
  draggingNodeId: string | null;
}

const initialState: ReactFlowState = {
  minimalistic: false,
  selectedNodeId: null,
  hoveredNodeId: null,
  selectedEdgeId: null,
  hoveredEdgeId: null,
  nodes: initialNodes,
  edges: initialEdges,
  viewport: { x: 0, y: 0, zoom: 1 },
  draggingNodeId: null,
};

const reactFlowSlice = createSlice({
  name: "reactFlow",
  initialState,
  reducers: {
    toggleMinimalistic: (state) => {
      state.minimalistic = !state.minimalistic;
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
    startDraggingNode: (
      state,
      action: PayloadAction<{
        type: BlockType;
        position: { x: number; y: number };
      }>,
    ) => {
      const { type, position } = action.payload;
      const blockConfig = blockConfigs[type];

      if (!blockConfig) {
        throw new Error(`Unknown node type: ${type}`);
      }

      const newNode: CustomNode = {
        id: _.uniqueId("node-"),
        type: blockConfig.type,
        position,
        dragging: true,
        data: { ...blockConfig.data! },
      };

      state.nodes.push(newNode);
      state.draggingNodeId = newNode.id;
      state.selectedNodeId = newNode.id;
      state.hoveredNodeId = newNode.id;
    },

    finishDraggingNode: (state) => {
      state.draggingNodeId = null;
    },

    cancelDraggingNode: (state) => {
      if (state.draggingNodeId) {
        state.nodes = state.nodes.filter(
          (node) => node.id !== state.draggingNodeId,
        );
        state.draggingNodeId = null;
      }
    },

    updateDraggingNodePosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      if (state.draggingNodeId) {
        const nodeIndex = state.nodes.findIndex(
          (node) => node.id === state.draggingNodeId,
        );
        if (nodeIndex !== -1) {
          state.nodes[nodeIndex].position = action.payload;
        }
      }
    },
  },
});

export const {
  toggleMinimalistic,
  setSelectedNodeId,
  setHoveredNodeId,
  setNodes,
  updateNodes,
  updateEdges,
  setEdges,
  setSelectedEdgeId,
  setHoveredEdgeId,
  setViewport,
  updateNodesData,
  startDraggingNode,
  finishDraggingNode,
  cancelDraggingNode,
  updateDraggingNodePosition,
} = reactFlowSlice.actions;

export default reactFlowSlice.reducer;
