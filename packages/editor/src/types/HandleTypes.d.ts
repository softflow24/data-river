export type Handle = {
  id: string;
  nodeId: string;
  type: "input" | "output";
  label: string;
  property: string;
  propertyType: string | string[];
};
