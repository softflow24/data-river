import { Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: { x: 0, y: 100 },
    data: { label: "Start", isMinimalist: false },
  },
  {
    id: "2",
    type: "input",
    position: { x: 200, y: 100 },
    data: { label: "Input", isMinimalist: false },
  },
  {
    id: "3",
    type: "logic",
    position: { x: 400, y: 100 },
    data: { label: "Logic", isMinimalist: false, condition: "input === 'Yes'" },
  },
  {
    id: "4",
    type: "output",
    position: { x: 600, y: 100 },
    data: { label: "Output", isMinimalist: false },
  },
  {
    id: "5",
    type: "end",
    position: { x: 800, y: 100 },
    data: { label: "End", isMinimalist: false },
  },
];
