
import { Search, Plus, Grid, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export function TopBar({ searchQuery, setSearchQuery, viewMode, setViewMode }: TopBarProps) {
  const filters = ["Pinned", "Recent", "Tagged"];

  return (
    <div className="bg-white border-b border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200 focus:border-purple-300 focus:ring-purple-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <Badge 
                key={filter} 
                variant="secondary" 
                className="cursor-pointer hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-slate-200 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              className="w-8 h-8 p-0"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "ghost"}
              onClick={() => setViewMode("list")}
              className="w-8 h-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Bookmark
          </Button>
        </div>
      </div>
    </div>
  );
}
