import { Node } from "reactflow";
import { RequestNodeData } from "@/types/NodeTypes";
import { url } from "inspector";

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
    inputsConfiguration: {
      trigger: { type: "boolean", required: false },
      url: { type: "string", required: false },
      headers: { type: "object", required: false },
      body: { type: "object", required: false },
    },
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
