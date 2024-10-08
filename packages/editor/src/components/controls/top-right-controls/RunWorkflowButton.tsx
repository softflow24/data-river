import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, setIsBottomPanelVisible } from "@/store";
import {
  syncBlocksWithNodes,
  setIsExecuting,
  setExecutionResult,
} from "@/slices/executionSlice";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import { useExecutionState } from "@/hooks/useExecutionState";
import {
  createExecutionEngine,
  createExecutionEngineConfig,
} from "@data-river/execution-engine";
import {
  IEnvironment,
  IConnection,
  IBlockConfig,
} from "@data-river/shared/interfaces";
import { BlockMapperService } from "../../../services/BlockMapperService";
import BlockValidationError from "../../../../../blocks/src/errors/blockValidationError";
import { CustomLogger } from "@/utils/customLogger";
import { useToast } from "@data-river/shared/ui/hooks/use-toast";
import { ToastAction } from "@data-river/shared/ui/components/ui/toast";
import { Button } from "@data-river/shared/ui/components/ui/button";

const RunWorkflowButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { executionBlocks } = useExecutionState();
  const { edges, nodes } = useReactFlowState();

  useEffect(() => {
    dispatch(syncBlocksWithNodes(nodes));
  }, [nodes]);

  const runWorkflow = async () => {
    dispatch(setIsExecuting(true));

    const blockMapper = new BlockMapperService();
    const blockConfigs: IBlockConfig[] = executionBlocks.map((block) =>
      blockMapper.mapBlockToExecutionEngineConfig(block),
    );

    const environment: IEnvironment = {
      variables: { apiKey: "test" }, // You might want to get this from a secure source
      errors: {},
    };

    const logic = blockConfigs.find((x) => x.type.match("logic"));

    if (!logic) {
      throw new Error("No logic block found");
    }

    const connections: IConnection[] = edges.map((edge) => ({
      from: edge.source,
      to: edge.target,
      inputKey: "data",
      outputKey: "data",
      sourceHandle: edge.sourceHandle ?? undefined,
      targetHandle: edge.targetHandle ?? undefined,
    }));

    const config = createExecutionEngineConfig({
      workflowConfig: {
        maxConcurrentTasks: 1,
        executionContext: "browser",
        supportsWebSocket: false,
        retryOnFailure: false,
        connections,
      },
      environment,
    });

    const logger = new CustomLogger();

    try {
      const engine = createExecutionEngine(config, logger);
      const result = await engine.executeWorkflow(blockConfigs);
      console.log(result);
      dispatch(
        setExecutionResult({
          result: result.result,
          errors: result.errors.map((error) => ({
            blockId: error.blockId,
            error:
              error.error instanceof BlockValidationError
                ? error.error.toJSON()
                : { name: error.error.name, message: error.error.message },
          })),
        }),
      );

      if (result.errors.length > 0) {
        toast({
          variant: "destructive",
          title: "Error executing workflow",
          description: "There was a problem with your workflow.",
          action: (
            <ToastAction
              altText="Check logs"
              onClick={() => {
                dispatch(setIsBottomPanelVisible(true));
              }}
            >
              Check logs
            </ToastAction>
          ),
        });
      } else {
        toast({
          variant: "default",
          title: "Workflow executed",
          description: "Your workflow has been executed.",
        });
      }

      logger.info("Workflow executed in browser environment", result);
    } catch (error: unknown) {
      logger.error("Error executing workflow:", error);

      if (error instanceof Error) {
        dispatch(
          setExecutionResult({
            result: [],
            errors: [
              {
                blockId: "error",
                error:
                  error instanceof BlockValidationError
                    ? error.toJSON()
                    : { name: error.name, message: error.message },
              },
            ],
          }),
        );

        toast({
          variant: "destructive",
          title: "Error executing workflow",
          description: "There was a problem with your workflow.",
          action: (
            <ToastAction
              altText="Check logs"
              onClick={() => {
                dispatch(setIsBottomPanelVisible(true));
              }}
            >
              Check logs
            </ToastAction>
          ),
        });
      } else {
        dispatch(
          setExecutionResult({
            result: [],
            errors: [
              {
                blockId: "error",
                error: {
                  name: "UnknownError",
                  message: "An unknown error occurred",
                },
              },
            ],
          }),
        );
      }
    } finally {
      dispatch(setIsExecuting(false));
    }
  };

  return <Button onClick={runWorkflow}>Run Workflow</Button>;
};

export default RunWorkflowButton;
