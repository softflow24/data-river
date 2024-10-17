import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  PlusCircle,
  Save,
  Trash2,
} from "lucide-react";

import { Button } from "@data-river/shared/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@data-river/shared/ui/components/ui/dropdown-menu";
import { Input } from "@data-river/shared/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@data-river/shared/ui/components/ui/table";
import _ from "lodash";

export type KeyValuePair = {
  id: string;
  key: string;
  value: string;
};

export function KeyValueTable({
  data,
  setData,
  title,
}: {
  data: KeyValuePair[];
  setData: (data: KeyValuePair[]) => void;
  title: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [newItems, setNewItems] = React.useState<KeyValuePair[]>([]);

  const columns: ColumnDef<KeyValuePair>[] = [
    {
      accessorKey: "key",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="flex flex-1 items-start justify-start flex-row gap-2 text-left">
              Key <ArrowUpDown className="ml-2 h-4 w-4" />
            </span>
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("key")}</div>,
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => <div>{row.getValue("value")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      size: 0,
      maxSize: 10,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEditItem(item)}>
                  Edit {title}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteItem(item.id)}>
                  Delete {title}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const addNewItem = () => {
    setNewItems([
      ...newItems,
      { id: _.uniqueId("new-item-"), key: "", value: "" },
    ]);
  };

  const updateNewItem = (id: string, field: "key" | "value", value: string) => {
    setNewItems(
      newItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeNewItem = (id: string) => {
    setNewItems(newItems.filter((item) => item.id !== id));
  };

  const handleSaveNewItems = () => {
    const validItems = newItems.filter((item) => item.key.trim() !== "");
    if (validItems.length > 0) {
      setData([...data, ...validItems]);
      setNewItems([]);
    }
  };

  const handleEditItem = (item: KeyValuePair) => {
    setNewItems([...newItems, { ...item }]);
    setData(data.filter((p) => p.id !== item.id));
  };

  const handleDeleteItem = (id: string) => {
    setData(data.filter((p) => p.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder={`Filter ${title}...`}
          value={(table.getColumn("key")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("key")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        <div className="flex items-center space-x-2 ml-2">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              newItems.length > 0 ? "w-9 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <Button
              onClick={handleSaveNewItems}
              variant="default"
              size="icon"
              className="w-9 h-9"
            >
              <Save size={16} />
            </Button>
          </div>
          <Button onClick={addNewItem} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New {title}
          </Button>
        </div>
      </div>
      <div className="space-y-2 mt-2 mb-4">
        {newItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Input
              value={item.key}
              onChange={(e) => updateNewItem(item.id, "key", e.target.value)}
              placeholder="Key"
              className="w-40 grow-0 truncate"
            />
            <Input
              value={item.value}
              onChange={(e) => updateNewItem(item.id, "value", e.target.value)}
              placeholder="Value"
              className="w-40 grow truncate"
            />
            <Button
              className="shrink-0"
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeNewItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
