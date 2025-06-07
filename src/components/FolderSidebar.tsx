
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddFolderInput } from "@/components/AddFolderInput";
import { FolderActions } from "@/components/FolderActions";

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
      { 
        id: "1-1", 
        name: "React", 
        count: 12,
        children: [
          { id: "1-1-1", name: "Hooks", count: 5 },
          { id: "1-1-2", name: "Components", count: 7 },
        ]
      },
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
  const [activeFolder, setActiveFolder] = useState<string>("1");
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [addingSubfolderTo, setAddingSubfolderTo] = useState<string | null>(null);

  const toggleFolder = (id: string) => {
    setFolders(prev => updateFolderExpansion(prev, id));
  };

  const updateFolderExpansion = (items: FolderItem[], targetId: string): FolderItem[] => {
    return items.map(folder => {
      if (folder.id === targetId) {
        return { ...folder, expanded: !folder.expanded };
      }
      if (folder.children) {
        return { ...folder, children: updateFolderExpansion(folder.children, targetId) };
      }
      return folder;
    });
  };

  const addFolder = (name: string, parentId?: string) => {
    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name,
      count: 0,
      children: []
    };

    if (parentId) {
      setFolders(prev => addFolderToParent(prev, parentId, newFolder));
      setAddingSubfolderTo(null);
    } else {
      setFolders(prev => [...prev, newFolder]);
      setShowAddFolder(false);
    }
  };

  const addFolderToParent = (items: FolderItem[], parentId: string, newFolder: FolderItem): FolderItem[] => {
    return items.map(folder => {
      if (folder.id === parentId) {
        return {
          ...folder,
          children: [...(folder.children || []), newFolder],
          expanded: true
        };
      }
      if (folder.children) {
        return { ...folder, children: addFolderToParent(folder.children, parentId, newFolder) };
      }
      return folder;
    });
  };

  const deleteFolder = (id: string) => {
    setFolders(prev => removeFolderById(prev, id));
  };

  const removeFolderById = (items: FolderItem[], targetId: string): FolderItem[] => {
    return items
      .filter(folder => folder.id !== targetId)
      .map(folder => ({
        ...folder,
        children: folder.children ? removeFolderById(folder.children, targetId) : undefined
      }));
  };

  const renderFolderItem = (folder: FolderItem, level: number = 0) => (
    <div key={folder.id} className="w-full">
      <div
        className={`group w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${
          activeFolder === folder.id 
            ? 'bg-purple-50 text-purple-700 border border-purple-200 font-semibold' 
            : 'hover:bg-slate-50'
        }`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={() => setActiveFolder(folder.id)}
      >
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFolder(folder.id);
            }}
            className="flex items-center justify-center w-4 h-4"
          >
            {folder.children && folder.children.length > 0 && (
              <div className="transition-transform duration-200">
                {folder.expanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            )}
          </button>
          <Folder className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-700">{folder.name}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {folder.count}
          </span>
          <FolderActions
            onEdit={() => setEditingFolder(folder.id)}
            onDelete={() => deleteFolder(folder.id)}
            onAddSubfolder={() => setAddingSubfolderTo(folder.id)}
          />
        </div>
      </div>
      
      {addingSubfolderTo === folder.id && (
        <div style={{ paddingLeft: `${28 + level * 16}px` }} className="mt-2">
          <AddFolderInput
            onSave={(name) => addFolder(name, folder.id)}
            onCancel={() => setAddingSubfolderTo(null)}
            placeholder="Subfolder name"
          />
        </div>
      )}
      
      {folder.expanded && folder.children && (
        <div className="mt-1 space-y-1 animate-accordion-down">
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
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-8 h-8 p-0 hover:bg-purple-100 hover:text-purple-700"
            onClick={() => setShowAddFolder(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {showAddFolder && (
          <AddFolderInput
            onSave={(name) => addFolder(name)}
            onCancel={() => setShowAddFolder(false)}
          />
        )}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {folders.map(folder => renderFolderItem(folder))}
        </div>
      </div>
    </div>
  );
}
