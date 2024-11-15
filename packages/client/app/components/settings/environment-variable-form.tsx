import { Form } from "@remix-run/react";
import { Input } from "@data-river/shared/ui";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@data-river/shared/ui/components/ui/table";

type KeyValuePair = {
  id: string;
  key: string;
  value: string;
};

export function EnvironmentVariableForm() {
  const [items, setItems] = useState<KeyValuePair[]>([
    { id: _.uniqueId("item-"), key: "", value: "" }
  ]);
  const [showInputs] = useState(true);

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
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="w-full">
      <Form method="post" className="w-full">
        <div className="bg-background shadow-sm rounded-lg px-16 py-4 space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[45%]">Key</TableHead>
                  <TableHead className="w-[45%]">Value</TableHead>
                  <TableHead className="w-[10%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-4 pr-1">
                      <Input
                        value={item.key}
                        onChange={(e) => updateItem(item.id, "key", e.target.value)}
                        placeholder="Key"
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell className="py-4 pr-1">
                      <Input
                        value={item.value}
                        onChange={(e) => updateItem(item.id, "value", e.target.value)}
                        placeholder="Value"
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell className="p-0">
                      <div className="flex items-center gap-2">
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {item.id === items[items.length - 1].id && (
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={addNewItem}
                            className="flex items-center gap-2 whitespace-nowrap"
                          >
                            <PlusCircle className="h-4 w-4" />
                            Add new variable
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-start gap-4 pt-4">
            <Button type="submit">
              Save Variable
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setItems([{ id: _.uniqueId("item-"), key: "", value: "" }]);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
} 