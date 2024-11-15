import { Input } from "@data-river/shared/ui";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { useState } from "react";
import { PlusCircle, Trash2, ArrowUpDown } from "lucide-react";
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

type SortDirection = 'asc' | 'desc' | null;

// Add dummy data
const dummyData: KeyValuePair[] = [
  { id: '1', key: 'DATABASE_URL', value: 'postgres://localhost:5432/mydb' },
  { id: '2', key: 'API_KEY', value: 'sk_test_123456789' },
  { id: '3', key: 'REDIS_HOST', value: 'redis://localhost:6379' },
  { id: '4', key: 'NODE_ENV', value: 'development' },
  { id: '5', key: 'PORT', value: '3000' },
  { id: '6', key: 'AWS_ACCESS_KEY', value: 'AKIA1234567890' },
  { id: '7', key: 'AWS_SECRET_KEY', value: 'abcdef1234567890' },
  { id: '8', key: 'STRIPE_SECRET', value: 'sk_live_1234567890' },
  { id: '9', key: 'SMTP_HOST', value: 'smtp.gmail.com' },
  { id: '10', key: 'SMTP_PORT', value: '587' },
  { id: '11', key: 'MAIL_USERNAME', value: 'noreply@example.com' },
  { id: '12', key: 'APP_NAME', value: 'Data River' },
  { id: '13', key: 'DEBUG_MODE', value: 'true' },
  { id: '14', key: 'LOG_LEVEL', value: 'info' },
  { id: '15', key: 'CACHE_TTL', value: '3600' }
];

export function EnvironmentVariableTable() {
  const [filter, setFilter] = useState("");
  const [items] = useState<KeyValuePair[]>(dummyData);// Initialize with dummy data
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Add sorting function
  const toggleSort = () => {
    if (sortDirection === null) setSortDirection('asc');
    else if (sortDirection === 'asc') setSortDirection('desc');
    else setSortDirection(null);
  };

  // Filter and sort items
  const filteredAndSortedItems = items
    .filter((item) =>
      item.key.toLowerCase().includes(filter.toLowerCase()) ||
      item.value.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.key.localeCompare(b.key);
      } else if (sortDirection === 'desc') {
        return b.key.localeCompare(a.key);
      }
      return 0;
    });

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="bg-background shadow-sm rounded-lg px-4 py-4 space-y-4">
          <div className="flex items-center py-4 justify-between">
            <Input
              placeholder="Filter variables..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 w-full"
                      onClick={toggleSort}
                    >
                      <span className="flex flex-1 items-start justify-start flex-row gap-2 text-left">
                        Key <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection ? 'text-primary' : ''}`} />
                      </span>
                    </Button>
                  </TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedItems.length > 0 ? (
                  filteredAndSortedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.key}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
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
        </div>
      </div>
    </div>
  );
} 