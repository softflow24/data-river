import CustomNode from "./customNode";

export const nodeTypes = {
  start: (props: any) => (
    <CustomNode
      {...props}
      type="start"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  input: (props: any) => (
    <CustomNode
      {...props}
      type="input"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  logic: (props: any) => (
    <CustomNode
      {...props}
      type="logic"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  output: (props: any) => (
    <CustomNode
      {...props}
      type="output"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  end: (props: any) => (
    <CustomNode {...props} type="end" isMinimalist={props.data.isMinimalist} />
  ),
};
