import { Label } from "@data-river/shared/ui";
import { KeyValueTable, KeyValuePair } from "./QueryParamsTable";

interface HeadersTabProps {
  headers: KeyValuePair[];
  setHeaders: React.Dispatch<React.SetStateAction<KeyValuePair[]>>;
}

export function HeadersTab({ headers, setHeaders }: HeadersTabProps) {
  return (
    <div className="mt-6">
      <Label>Headers</Label>
      <KeyValueTable data={headers} setData={setHeaders} title="Header" />
    </div>
  );
}
