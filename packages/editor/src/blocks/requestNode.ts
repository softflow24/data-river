import { Node } from "reactflow";
import { RequestNodeData } from "@/types/NodeTypes";

export const requestNode: Omit<Node<RequestNodeData>, "position"> = {
  id: "0",
  type: "custom",
  data: {
    block: "request@0.1",
    label: "Request",
    color: "rgb(234 179 8)",
    sourceHandle: true,
    targetHandle: true,
    icon: "Network",
    config: {
      httpMethod: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/ditto",
      headers: [
        {
          key: "Content-Type",
          value: "application/json",
        },
      ],
      bodyType: "none",
    },
    inputsConfiguration: {},
    outputsConfiguration: {
      data: { type: "object", required: true },
      status: { type: "number", required: true },
      statusText: { type: "string", required: true },
    },
    controls: [
      {
        type: "request-info",
        label: "Request Info",
        name: "request-info",
      },
    ],
  },
};
