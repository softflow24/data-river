import React from "react";

import CustomNode from "./customNode";

export const nodeTypes = {
  start: (props: any) => (
    <CustomNode
      {...props}
      type="start"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  process: (props: any) => (
    <CustomNode
      {...props}
      type="process"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  conditional: (props: any) => (
    <CustomNode
      {...props}
      type="conditional"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  action: (props: any) => (
    <CustomNode
      {...props}
      type="action"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  response: (props: any) => (
    <CustomNode
      {...props}
      type="response"
      isMinimalist={props.data.isMinimalist}
    />
  ),
};
