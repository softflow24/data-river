import { injectable } from "tsyringe";
import { Node } from "reactflow";
import { ISharedBlock } from "@data-river/shared/interfaces/ISharedBlock";

@injectable()
export class ReactFlowMapperService {
  mapBlockToReactFlowNode(block: ISharedBlock): Node {
    return {
      id: block.id,
      type: this.mapBlockTypeToNodeType(block.type),
      position: block.position,
      data: {
        label: block.data.label,
        color: block.data.color,
        icon: block.data.icon,
        sourceHandle: Object.keys(block.data.outputConfigs ?? {}).length > 0,
        targetHandle: Object.keys(block.data.inputConfigs ?? {}).length > 0,
      },
    };
  }

  private mapBlockTypeToNodeType(blockType: string): string {
    switch (blockType) {
      case "blocks/start@0.1":
        return "start";
      case "blocks/end@0.1":
        return "end";
      case "blocks/input@0.1":
        return "input";
      case "blocks/output@0.1":
        return "output";
      default:
        return "custom";
    }
  }
}
