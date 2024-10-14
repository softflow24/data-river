import { Connection, Edge } from "reactflow";

export function isValidConnection(
  connection: Connection,
  newEdges: Edge[],
): boolean {
  const circularConnectionExists = newEdges.some(
    (edge) =>
      edge.sourceHandle === connection.targetHandle ||
      edge.targetHandle === connection.sourceHandle,
  );

  return (
    connection.sourceHandle !== connection.targetHandle &&
    !circularConnectionExists
  );
}
