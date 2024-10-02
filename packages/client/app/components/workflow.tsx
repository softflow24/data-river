import { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Home, Flag, Plus } from 'lucide-react'

const nodeWidth = 180
const nodeHeight = 40

const CustomSourceHandle = ({ type, position, isConnectable }) => (
  <Handle
    type={type}
    position={position}
    isConnectable={isConnectable}
    style={{ background: '#3b82f6', width: 12, height: 12 }}
  >
    <div className="w-full h-full flex items-center justify-center">
      <Plus className="h-2 w-2 text-white" />
    </div>
  </Handle>
)

const CustomTargetHandle = ({ type, position, isConnectable }) => (
  <Handle
    type={type}
    position={position}
    isConnectable={isConnectable}
    style={{ background: '#3b82f6', width: 3, height: nodeHeight / 3, borderRadius: 0 }}
  />
)

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'customInput',
    data: {
      label: (
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full p-1 mr-2">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm">START</span>
        </div>
      )
    },
    position: { x: 250, y: 0 },
    style: {
      background: 'white',
      border: '1px solid #3b82f6',
      borderRadius: '8px',
      padding: '0 10px',
      width: nodeWidth,
      height: nodeHeight,
      display: 'flex',
      alignItems: 'center',
    },
  },
  {
    id: '2',
    type: 'customOutput',
    data: {
      label: (
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full p-1 mr-2">
            <Flag className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm">END</span>
        </div>
      )
    },
    position: { x: 250, y: 100 },
    style: {
      background: 'white',
      border: '1px solid #22c55e',
      borderRadius: '8px',
      padding: '0 10px',
      width: nodeWidth,
      height: nodeHeight,
      display: 'flex',
      alignItems: 'center',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
]

const nodeTypes = {
  customInput: (props) => (
    <div style={props.style}>
      {props.data.label}
      <CustomSourceHandle type="source" position={Position.Right} isConnectable={props.isConnectable} />
    </div>
  ),
  customOutput: (props) => (
    <div style={props.style}>
      <CustomTargetHandle type="target" position={Position.Left} isConnectable={props.isConnectable} />
      {props.data.label}
    </div>
  ),
}

export function WorkflowComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <div className="w-full h-[400px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}