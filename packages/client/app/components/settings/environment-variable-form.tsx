import { Form } from "@remix-run/react";
import { Input } from "@data-river/shared/ui";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { useState } from "react";
import { PlusCircle, Trash2, ArrowUpDown } from "lucide-react";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@data-river/shared/ui/components/ui/table";

interface EnvironmentVariableFormProps {
  onCancel?: () => void;
  onSave?: (data: any) => void;
}

type KeyValuePair = {
  id: string;
  key: string;
  value: string;
};

export function EnvironmentVariableForm({ onCancel, onSave }: EnvironmentVariableFormProps) {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState<KeyValuePair[]>([]);

  const filteredItems = items.filter((item) => 
    item.key.toLowerCase().includes(filter.toLowerCase()) ||
    item.value.toLowerCase().includes(filter.toLowerCase())
  );

  const addNewItem = () => {
    setItems([...items, { id: _.uniqueId("item-"), key: "", value: "" }]);
  };

  const updateItem = (id: string, field: "key" | "value", value: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Form method="post" className="w-full max-w-2xl mx-auto">
      <div className="bg-background shadow-sm rounded-lg px-4 py-4 space-y-4">
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Filter variables..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center space-x-2 ml-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={addNewItem}
              className="flex items-center gap-2 w-[245px]"
            >
              <PlusCircle className="h-4 w-4" />
              Add new variable
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="p-0 w-full"
                  >
                    <span className="flex flex-1 items-start justify-start flex-row gap-2 text-left">
                      Key <ArrowUpDown className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={item.key}
                        onChange={(e) => updateItem(item.id, "key", e.target.value)}
                        placeholder="Key"
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.value}
                        onChange={(e) => updateItem(item.id, "value", e.target.value)}
                        placeholder="Value"
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-12 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-start gap-4 pt-4">
          <Button type="submit">
            Save Variable
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
} 