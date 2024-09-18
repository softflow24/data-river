import { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  ControlButton,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Play, GitBranch, Box, Zap, MessageSquare, ZoomIn, ZoomOut, Undo, ArrowLeft, MousePointer, Hand, PlusCircle, Wand } from 'lucide-react'

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  conditional: ConditionalNode,
  action: ActionNode,
  response: ResponseNode,
}

function StartNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-500 text-white">
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-200" />
      <div className="flex items-center">
        <Play size={16} className="mr-2" />
        <div className="font-bold">{data.label}</div>
      </div>
    </div>
  )
}

function ProcessNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-500 text-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-purple-200" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-purple-200" />
      <div className="flex items-center">
        <Box size={16} className="mr-2" />
        <div className="font-bold">{data.label}</div>
      </div>
    </div>
  )
}

function ConditionalNode({ data }: { data: { label: string, condition: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-yellow-500 text-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-yellow-200" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-200" id="yes" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-200" id="no" style={{ top: '75%' }} />
      <div className="flex items-center">
        <GitBranch size={16} className="mr-2" />
        <div className="font-bold">{data.label}</div>
      </div>
      <div className="mt-2 text-sm bg-yellow-600 p-1 rounded">
        IF: {data.condition}
      </div>
      <div className="absolute right-2 top-1/3 text-xs">Yes</div>
      <div className="absolute right-2 top-3/4 text-xs">No</div>
    </div>
  )
}

function ActionNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-500 text-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-green-200" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-green-200" />
      <div className="flex items-center">
        <Zap size={16} className="mr-2" />
        <div className="font-bold">{data.label}</div>
      </div>
    </div>
  )
}

function ResponseNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-red-500 text-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-red-200" />
      <div className="flex items-center">
        <MessageSquare size={16} className="mr-2" />
        <div className="font-bold">{data.label}</div>
      </div>
    </div>
  )
}

const initialNodes: Node[] = [
  { id: '1', type: 'start', position: { x: 0, y: 100 }, data: { label: 'Start' } },
  { id: '2', type: 'process', position: { x: 200, y: 0 }, data: { label: 'Process' } },
  { id: '3', type: 'conditional', position: { x: 400, y: 100 }, data: { label: 'Condition', condition: 'text contains Yes' } },
  { id: '4', type: 'action', position: { x: 600, y: 0 }, data: { label: 'Action' } },
  { id: '5', type: 'response', position: { x: 800, y: 100 }, data: { label: 'Response' } },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'yes', animated: true },
  { id: 'e3-5', source: '3', target: '5', sourceHandle: 'no', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
]

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const { zoomIn, zoomOut, getZoom } = useReactFlow()

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const addNewNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'process',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Node ${nodes.length + 1}` },
    }
    setNodes((nds) => nds.concat(newNode))
  }, [nodes, setNodes])

  return (
    <div className="w-full h-screen min-h-screen max-h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        {/* <Panel position="bottom-left" className="absolute left-0 bottom-0 mb-4 flex flex-col items-start max-w-sm min-w-full">
  <div className="flex flex-row space-y-2 w-full">
    
    <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center w-auto">
    
      <MiniMap />
    
      <div className="mt-2 flex items-center justify-between w-full">
        <button onClick={() => zoomOut()} className="text-gray-600 hover:text-gray-800">
          <ZoomOut size={20} />
        </button>
        <span className="text-sm font-medium">{Math.round(getZoom() * 100)}%</span>
        <button onClick={() => zoomIn()} className="text-gray-600 hover:text-gray-800">
          <ZoomIn size={20} />
        </button>
      </div>
    </div>
    
    
    <div className="bg-white rounded-lg shadow-md p-2 flex items-center justify-between w-auto">
      <button className="text-gray-600 hover:text-gray-800">
        <ArrowLeft size={20} />
      </button>
      <button className="text-gray-600 hover:text-gray-800">
        <Undo size={20} />
      </button>
      <span className="text-sm font-medium">Change History</span>
    </div>
    
    
    <div className="bg-white rounded-lg shadow-md p-2 flex items-center justify-between w-auto">
      <button onClick={addNewNode} className="text-gray-600 hover:text-gray-800">
        <PlusCircle size={20} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-2"></div>
      <button className="text-gray-600 hover:text-gray-800">
        <MousePointer size={20} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-2"></div>
      
      <button className="text-blue-500 bg-blue-100 p-1 rounded-md">
        <Hand size={20} />
      </button>
    </div>
  </div>
</Panel> */}

<Controls style={{ bottom: '12px' }} className='flex flex-row bg-transparent mb-2' position='bottom-left' showFitView={false} showInteractive={false} showZoom={false}>
  
  {/* MiniMap and Zoom Controls */}
  <div className="mr-2 flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
    <MiniMap style={{
      position: "absolute",
      margin: 0,
      marginBottom: "60px"
    }} 
    position='bottom-left'
    pannable 
    zoomable />
    <div className="mt-2 flex items-center justify-between w-auto">
      <ControlButton className="text-gray-600 hover:text-gray-800" onClick={() => zoomOut()}>
        <ZoomOut size={20} />
      </ControlButton>
      <span className="mx-2 text-sm font-medium text-gray-500">{Math.round(getZoom() * 100)}%</span>
      <ControlButton className="text-gray-600 hover:text-gray-800" onClick={() => zoomIn()}>
        <ZoomIn size={20} />
      </ControlButton>
    </div>
  </div>

  {/* Undo/Redo Controls */}
  <div className="mr-2 flex items-center bg-white p-2 rounded-lg shadow-md">
    <ControlButton className="text-gray-600 hover:text-gray-800" onClick={() => undo()}>
      <ArrowLeft size={20} />
    </ControlButton>
    <ControlButton className="text-gray-600 hover:text-gray-800" onClick={() => redo()}>
      <Undo size={20} />
    </ControlButton>
  </div>

  {/* Action Tools (Add Node, Hand Tool) */}
  <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
    <ControlButton className="text-gray-600 hover:text-gray-800" onClick={() => addNewNode()}>
      <PlusCircle size={20} />
    </ControlButton>
    {/* Separator */}
    <div className="w-px h-6 bg-gray-300 mx-2"></div>
    <ControlButton className="text-gray-600 hover:text-gray-800">
      <MousePointer size={20} />
    </ControlButton>
    {/* Separator */}
    <div className="w-px h-6 bg-gray-300 mx-2"></div>
    <ControlButton className="text-blue-500 bg-blue-100 p-1 rounded-md">
      <Hand size={20} />
    </ControlButton>
  </div>
</Controls>





      </ReactFlow>
      {selectedNode && (
        <div className="absolute bottom-4 left-4 p-4 bg-white shadow-lg rounded-md">
          <h3 className="font-bold mb-2">Selected Node</h3>
          <p>ID: {selectedNode.id}</p>
          <p>Type: {selectedNode.type}</p>
          <p>Label: {selectedNode.data?.label || 'Unnamed Node'}</p>
        </div>
      )}
    </div>
  )
}

export function EnhancedNodeEditorComponent() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}