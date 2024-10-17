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
  ChevronDown,
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

export type QueryParam = {
  id: string;
  key: string;
  value: string;
};

export function QueryParamsTable({
  data,
  setData,
}: {
  data: QueryParam[];
  setData: (data: QueryParam[]) => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [newParams, setNewParams] = React.useState<QueryParam[]>([]);

  const columns: ColumnDef<QueryParam>[] = [
    {
      accessorKey: "key",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Key
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
      cell: ({ row }) => {
        const param = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(param.id)}
              >
                Copy param ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEditParam(param)}>
                Edit param
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteParam(param.id)}>
                Delete param
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

  const addNewParam = () => {
    setNewParams([
      ...newParams,
      { id: _.uniqueId("new-param-"), key: "", value: "" },
    ]);
  };

  const updateNewParam = (
    id: string,
    field: "key" | "value",
    value: string,
  ) => {
    setNewParams(
      newParams.map((param) =>
        param.id === id ? { ...param, [field]: value } : param,
      ),
    );
  };

  const removeNewParam = (id: string) => {
    setNewParams(newParams.filter((param) => param.id !== id));
  };

  const handleSaveNewParams = () => {
    const validParams = newParams.filter((param) => param.key.trim() !== "");
    if (validParams.length > 0) {
      setData([...data, ...validParams]);
      setNewParams([]);
    }
  };

  const handleEditParam = (param: QueryParam) => {
    setNewParams([...newParams, { ...param }]);
    setData(data.filter((p) => p.id !== param.id));
  };

  const handleDeleteParam = (id: string) => {
    setData(data.filter((p) => p.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter keys..."
          value={(table.getColumn("key")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("key")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2 ml-2">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              newParams.length > 0 ? "w-10 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <Button
              onClick={handleSaveNewParams}
              variant="default"
              size="icon"
              className="w-9 h-9"
            >
              <Save size={16} />
            </Button>
          </div>
          <Button onClick={addNewParam} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Param
          </Button>
        </div>
      </div>
      <div className="space-y-2 mt-2 mb-4">
        {newParams.map((param) => (
          <div key={param.id} className="flex items-center space-x-2">
            <Input
              value={param.key}
              onChange={(e) => updateNewParam(param.id, "key", e.target.value)}
              placeholder="Key"
              className="w-40 grow-0 truncate"
            />
            <Input
              value={param.value}
              onChange={(e) =>
                updateNewParam(param.id, "value", e.target.value)
              }
              placeholder="Value"
              className="w-40 grow truncate"
            />
            <Button
              className="shrink-0"
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeNewParam(param.id)}
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
                  className="h-24 text-center"
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
