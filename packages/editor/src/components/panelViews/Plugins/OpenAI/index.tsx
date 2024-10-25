import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Input,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@data-river/shared/ui";
import {
  OpenAIConfig,
  OpenAIStructuredConfig,
} from "@data-river/blocks/plugins/OpenAI";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import SettingsDialog from "./SettingsDialog";
import MessageItem from "./MessageItem";
import { Settings } from "lucide-react";
import openAIModels from "@data-river/blocks/plugins/OpenAI/schemas/models";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenAIPluginSidebarProps = {
  config: OpenAIConfig | OpenAIStructuredConfig;
  onConfigChange: (config: OpenAIConfig | OpenAIStructuredConfig) => void;
  nodeId: string;
};

const OpenAIPluginSidebar: React.FC<OpenAIPluginSidebarProps> = ({
  config,
  onConfigChange,
  nodeId,
}) => {
  const [localConfig, setLocalConfig] = useState<
    OpenAIConfig | OpenAIStructuredConfig
  >(config);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const inputMessages = (config as OpenAIConfig).inputs?.messages;
    return Array.isArray(inputMessages) ? inputMessages : [];
  });

  useEffect(() => {
    setLocalConfig(config);
    const inputMessages = (config as OpenAIConfig).inputs?.messages;
    setMessages(Array.isArray(inputMessages) ? inputMessages : []);
  }, [config]);

  const handleLocalConfigChange = (key: string, value: any) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleMessageChange = (
    index: number,
    key: "role" | "content",
    value: string,
  ) => {
    const newMessages = [...messages];
    newMessages[index] = { ...newMessages[index], [key]: value };
    setMessages(newMessages);
    handleLocalConfigChange("inputs", {
      messages: { messages: newMessages },
    });
  };

  const addMessage = () => {
    const hasSystemMessage = messages.some(
      (message) => message.role === "system",
    );

    const isLastMessageFromUser =
      messages.length > 0 && messages[messages.length - 1].role === "user";

    setMessages([
      ...messages,
      {
        role: hasSystemMessage
          ? isLastMessageFromUser
            ? "assistant"
            : "user"
          : "system",
        content: "",
      },
    ]);
  };

  const removeMessage = (index: number) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
    handleLocalConfigChange("inputs", { messages: newMessages });
  };

  const handleRoleChange = (
    index: number,
    role: "system" | "user" | "assistant",
  ) => {
    const newMessages = [...messages];
    newMessages[index].role = role;
    setMessages(newMessages);
    handleLocalConfigChange("inputs", { messages: newMessages });
  };

  const handleSave = () => {
    onConfigChange(localConfig);
  };

  return (
    <TooltipProvider>
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>
          <div className="flex items-center justify-between gap-2">
            <Select
              value={localConfig.model}
              onValueChange={(value) => handleLocalConfigChange("model", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {openAIModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">API Key</label>
            <Tooltip>
              <TooltipTrigger>
                <InfoCircledIcon className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>Your OpenAI API key</TooltipContent>
            </Tooltip>
          </div>
          <Input
            type="password"
            value={localConfig.apiKey}
            onChange={(e) => handleLocalConfigChange("apiKey", e.target.value)}
            placeholder="Enter your OpenAI API key"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Messages</label>
            <Button size="sm" variant="outline" onClick={addMessage}>
              <PlusIcon className="w-4 h-4 mr-1" /> Add Message
            </Button>
          </div>
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageItem
                key={index}
                message={message}
                index={index}
                onChangeRole={handleRoleChange}
                onRemove={removeMessage}
                onChange={handleMessageChange}
              />
            ))}
          </AnimatePresence>
        </div>

        {"type" in localConfig && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Response Type</label>
            <Select
              value={localConfig.type}
              onValueChange={(value) =>
                handleLocalConfigChange(
                  "type",
                  value as "functionCalling" | "structuredResponse",
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="functionCalling">
                  Function Calling
                </SelectItem>
                <SelectItem value="structuredResponse">
                  Structured Response
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <SettingsDialog
          isOpen={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          config={localConfig}
          onParameterChange={handleLocalConfigChange}
        />

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </TooltipProvider>
  );
};

export default OpenAIPluginSidebar;
