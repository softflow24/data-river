import { Label } from "@data-river/shared/ui";
import { KeyValueTable, KeyValuePair } from "./QueryParamsTable";

interface ParamsTabProps {
  queryParams: KeyValuePair[];
  setQueryParams: React.Dispatch<React.SetStateAction<KeyValuePair[]>>;
}

export function ParamsTab({ queryParams, setQueryParams }: ParamsTabProps) {
  return (
    <div className="mt-6">
      <Label>Query Parameters</Label>
      <KeyValueTable
        data={queryParams}
        setData={setQueryParams}
        title="Param"
      />
    </div>
  );
}
