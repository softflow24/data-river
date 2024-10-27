import { injectable } from "tsyringe";
import { Node } from "reactflow";
import { ISharedBlock } from "@data-river/shared/interfaces/ISharedBlock";
import { IBlockConfig } from "@data-river/shared/interfaces";
import { NodeData } from "@/types/NodeTypes";

@injectable()
export class BlockMapperService {
  mapReactFlowNodeToBlock(node: Node<NodeData>): ISharedBlock {
    return {
      id: node.id,
      type: this.mapNodeTypeToBlockType(node.data.block),
      position: node.position,
      data: {
        block: node.data.block,
        label: node.data.label,
        color: node.data.color,
        icon: node.data.icon,
        inputConfigs: node.data.inputsConfiguration,
        outputConfigs: node.data.outputsConfiguration,
        inputs: node.data.inputs,
        outputs: node.data.outputs,
        config: node.data.config,
      },
    };
  }

  mapBlockToExecutionEngineConfig(block: ISharedBlock): IBlockConfig {
    return {
      id: block.id,
      type: block.type,
      inputConfigs: block.data.inputConfigs,
      outputConfigs: block.data.outputConfigs,
      inputs: block.data.inputs,
      config: block.data.config,
    };
  }

  private mapNodeTypeToBlockType(nodeType: string | undefined): string {
    return `blocks/${nodeType}`;
  }
}
