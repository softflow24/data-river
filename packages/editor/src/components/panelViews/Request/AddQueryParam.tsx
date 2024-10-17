import React, { useState } from "react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Input } from "@data-river/shared/ui/components/ui/input";
import { Trash2 } from "lucide-react";
import _ from "lodash";

export type QueryParam = {
  id: string;
  key: string;
  value: string;
};

interface AddQueryParamProps {
  onAdd: (params: QueryParam[]) => void;
}

export function AddQueryParam({ onAdd }: AddQueryParamProps) {
  const [newParams, setNewParams] = useState<QueryParam[]>([]);

  const updateParam = (id: string, field: "key" | "value", value: string) => {
    setNewParams(
      newParams.map((param) =>
        param.id === id ? { ...param, [field]: value } : param,
      ),
    );
  };

  const removeParam = (id: string) => {
    setNewParams(newParams.filter((param) => param.id !== id));
  };

  const handleSave = () => {
    const validParams = newParams.filter((param) => param.key.trim() !== "");
    if (validParams.length > 0) {
      onAdd(validParams);
      setNewParams([]);
    }
  };

  return (
    <div className="space-y-2 mt-2 mb-4">
      {newParams.map((param) => (
        <div key={param.id} className="flex items-center space-x-2">
          <Input
            value={param.key}
            onChange={(e) => updateParam(param.id, "key", e.target.value)}
            placeholder="Key"
            className="w-40 grow-0 truncate"
          />
          <Input
            value={param.value}
            onChange={(e) => updateParam(param.id, "value", e.target.value)}
            placeholder="Value"
            className="w-40 grow truncate"
          />
          <Button
            className="shrink-0"
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeParam(param.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {newParams.length > 0 && (
        <Button type="button" onClick={handleSave}>
          Save New Params
        </Button>
      )}
    </div>
  );
}
