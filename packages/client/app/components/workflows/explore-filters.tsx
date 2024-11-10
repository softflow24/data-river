import { Search } from "lucide-react";
import { Input } from "@data-river/shared/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@data-river/shared/ui/components/ui/select";

export function ExploreFilters() {
  return (
    <div className="flex gap-4">
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search public workflows..."
          className="pl-8"
          // TODO: Add search functionality
        />
      </div>
      <Select defaultValue="popular">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="recent">Recently Added</SelectItem>
          <SelectItem value="runs">Most Runs</SelectItem>
          <SelectItem value="remixes">Most Remixes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
