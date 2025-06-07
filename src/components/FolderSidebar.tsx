
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FolderItem {
  id: string;
  name: string;
  count: number;
  children?: FolderItem[];
  expanded?: boolean;
}

const folderData: FolderItem[] = [
  {
    id: "1",
    name: "Web Development",
    count: 48,
    expanded: true,
    children: [
      { id: "1-1", name: "React", count: 12 },
      { id: "1-2", name: "TypeScript", count: 8 },
      { id: "1-3", name: "CSS", count: 15 },
    ],
  },
  {
    id: "2",
    name: "Design Resources",
    count: 32,
    children: [
      { id: "2-1", name: "UI/UX", count: 18 },
      { id: "2-2", name: "Icons", count: 7 },
      { id: "2-3", name: "Colors", count: 7 },
    ],
  },
  {
    id: "3",
    name: "Learning",
    count: 24,
    children: [
      { id: "3-1", name: "Tutorials", count: 15 },
      { id: "3-2", name: "Documentation", count: 9 },
    ],
  },
];

export function FolderSidebar() {
  const [folders, setFolders] = useState<FolderItem[]>(folderData);

  const toggleFolder = (id: string) => {
    setFolders(prev => 
      prev.map(folder => 
        folder.id === id 
          ? { ...folder, expanded: !folder.expanded }
          : folder
      )
    );
  };

  const renderFolderItem = (folder: FolderItem, level: number = 0) => (
    <div key={folder.id} className="w-full">
      <button
        onClick={() => toggleFolder(folder.id)}
        className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors duration-200 group"
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        <div className="flex items-center gap-2">
          {folder.children && (
            folder.expanded ? 
              <ChevronDown className="w-4 h-4 text-slate-400" /> : 
              <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
          <Folder className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">{folder.name}</span>
        </div>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {folder.count}
        </span>
      </button>
      
      {folder.expanded && folder.children && (
        <div className="mt-1">
          {folder.children.map(child => renderFolderItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">Collections</h2>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {folders.map(folder => renderFolderItem(folder))}
        </div>
      </div>
    </div>
  );
}
