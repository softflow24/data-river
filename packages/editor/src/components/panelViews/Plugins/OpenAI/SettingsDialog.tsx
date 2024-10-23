import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Slider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Switch,
  Input,
} from "@data-river/shared/ui";
import { OpenAIConfig } from "@data-river/blocks/plugins/OpenAI";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface SettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  config: Partial<OpenAIConfig>;
  onParameterChange: (
    param: keyof OpenAIConfig,
    value: OpenAIConfig[keyof OpenAIConfig] | undefined,
  ) => void;
}

type NumericConfigKeys = Extract<
  keyof OpenAIConfig,
  "temperature" | "maxTokens" | "topP" | "frequencyPenalty" | "presencePenalty"
>;

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onOpenChange,
  config,
  onParameterChange,
}) => {
  const [localConfig, setLocalConfig] = useState<Partial<OpenAIConfig>>(config);
  const [enabledParams, setEnabledParams] = useState<
    Record<NumericConfigKeys, boolean>
  >({
    temperature: config.temperature !== undefined,
    maxTokens: config.maxTokens !== undefined,
    topP: config.topP !== undefined,
    frequencyPenalty: config.frequencyPenalty !== undefined,
    presencePenalty: config.presencePenalty !== undefined,
  });

  useEffect(() => {
    setLocalConfig(config);
    setEnabledParams({
      temperature: config.temperature !== undefined,
      maxTokens: config.maxTokens !== undefined,
      topP: config.topP !== undefined,
      frequencyPenalty: config.frequencyPenalty !== undefined,
      presencePenalty: config.presencePenalty !== undefined,
    });
  }, [config]);

  const handleParameterChange = (
    param: NumericConfigKeys,
    value: number | undefined,
  ) => {
    setLocalConfig((prev) => ({ ...prev, [param]: value }));
  };

  const handleEnableParam = (param: NumericConfigKeys, enabled: boolean) => {
    setEnabledParams((prev) => ({ ...prev, [param]: enabled }));
    if (!enabled) {
      handleParameterChange(param, undefined);
    } else {
      handleParameterChange(
        param,
        (config[param] as number) ?? getDefaultValue(param),
      );
    }
  };

  const getDefaultValue = (param: NumericConfigKeys): number => {
    switch (param) {
      case "temperature":
        return 0.7;
      case "maxTokens":
        return 256;
      case "topP":
        return 1;
      case "frequencyPenalty":
        return 0;
      case "presencePenalty":
        return 0;
      default:
        return 0;
    }
  };

  const resetConfig = () => {
    setLocalConfig({});
    setEnabledParams({
      temperature: false,
      maxTokens: false,
      topP: false,
      frequencyPenalty: false,
      presencePenalty: false,
    });
  };

  const saveChanges = () => {
    Object.entries(localConfig).forEach(([key, value]) => {
      onParameterChange(key as keyof OpenAIConfig, value);
    });
    onOpenChange(false);
  };

  const renderParameter = (
    param: NumericConfigKeys,
    label: string,
    min: number,
    max: number,
    step: number,
    tooltip: string,
  ) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Switch
            className="w-11"
            checked={enabledParams[param]}
            onCheckedChange={(checked) => handleEnableParam(param, checked)}
          />
          <label className="text-sm font-medium">{label}</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoCircledIcon className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <AnimatePresence>
        {enabledParams[param] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-4"
          >
            <Slider
              min={min}
              max={max}
              step={step}
              value={[(localConfig[param] as number) ?? getDefaultValue(param)]}
              onValueChange={([value]) => handleParameterChange(param, value)}
              className="flex-grow"
            />
            <Input
              type="number"
              min={min}
              max={max}
              step={step}
              value={(localConfig[param] as number) ?? getDefaultValue(param)}
              onChange={(e) =>
                handleParameterChange(param, parseFloat(e.target.value))
              }
              className="w-20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Model Settings</AlertDialogTitle>
          <AlertDialogDescription>
            Adjust the parameters for the language model. Enable or disable
            parameters as needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="space-y-6">
            {renderParameter(
              "temperature",
              "Temperature",
              0,
              2,
              0.1,
              "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.",
            )}
            {renderParameter(
              "maxTokens",
              "Max Tokens",
              1,
              4096,
              1,
              "The maximum number of tokens to generate in the completion.",
            )}
          </div>
          <div className="space-y-6">
            {renderParameter(
              "topP",
              "Top P",
              0,
              1,
              0.05,
              "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
            )}
            {renderParameter(
              "frequencyPenalty",
              "Frequency Penalty",
              0,
              2,
              0.1,
              "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
            )}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-2">Live Preview</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            As you adjust the parameters, you'll see how they affect the model's
            behavior here. This is a placeholder for now, but you could
            implement a real-time preview of the model's output based on the
            current settings.
          </p>
        </div>
        <AlertDialogFooter>
          <div className="flex items-center justify-between w-full">
            <button
              onClick={resetConfig}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              Reset to Defaults
            </button>
            <div>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={saveChanges}>
                Save Changes
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsDialog;
