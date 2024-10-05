import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@data-river/shared/ui/components/ui/select";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Trash2, X } from "lucide-react";
import { LogLevel } from "@data-river/shared/interfaces/LogEntry";
import {
  clearLogs,
  setFilterLevel as setFilterLevelAction,
} from "@/slices/executionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, setIsBottomPanelVisible } from "@/store";

export const FilterAndClear: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filterLevel = useSelector(
    (state: RootState) => state.execution.filterLevel,
  );
  const setFilterLevel = (level: LogLevel) => {
    dispatch(setFilterLevelAction(level));
  };
  const clearLogsHandler = () => {
    dispatch(clearLogs());
  };

  const onClose = () => {
    dispatch(setIsBottomPanelVisible(false));
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={filterLevel}
        onValueChange={(value: LogLevel) => setFilterLevel(value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Filter level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="debug">Debug</SelectItem>
          <SelectItem value="info">Info</SelectItem>
          <SelectItem value="warn">Warn</SelectItem>
          <SelectItem value="error">Error</SelectItem>
          <SelectItem value="none">None</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={clearLogsHandler}>
        <Trash2 className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onClose}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
