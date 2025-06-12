
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddFolderInput } from "@/components/AddFolderInput";
import { DraggableFolderItem } from "@/components/DraggableFolderItem";
import { FolderDropZone } from "@/components/FolderDropZone";

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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const flattenTree = (items: FolderItem[]): string[] => {
    const result: string[] = [];
    for (const item of items) {
      result.push(item.id);
      if (item.children && item.expanded) {
        result.push(...flattenTree(item.children));
      }
    }
    return result;
  };

  const findFolderById = (items: FolderItem[], id: string): FolderItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findFolderById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const removeFolderFromTree = (items: FolderItem[], id: string): FolderItem[] => {
    return items
      .filter(item => item.id !== id)
      .map(item => ({
        ...item,
        children: item.children ? removeFolderFromTree(item.children, id) : undefined
      }));
  };

  const addFolderToParent = (items: FolderItem[], parentId: string, folder: FolderItem): FolderItem[] => {
    return items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children || []), folder],
          expanded: true
        };
      }
      if (item.children) {
        return {
          ...item,
          children: addFolderToParent(item.children, parentId, folder)
        };
      }
      return item;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveId(null);
      setOverId(null);
      return;
    }

    const activeFolder = findFolderById(folders, active.id as string);
    if (!activeFolder) return;

    // Remove the dragged folder from its current position
    const foldersWithoutActive = removeFolderFromTree(folders, active.id as string);
    
    // Add the folder to its new position
    if (over.id.toString().endsWith('-drop-zone')) {
      // Dropping into a folder
      const parentId = over.id.toString().replace('-drop-zone', '');
      setFolders(addFolderToParent(foldersWithoutActive, parentId, activeFolder));
    } else {
      // Reordering at the same level
      const overFolder = findFolderById(folders, over.id as string);
      if (overFolder) {
        // Simple reordering logic - add to the end for now
        setFolders([...foldersWithoutActive, activeFolder]);
      }
    }

    setActiveId(null);
    setOverId(null);
  };

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

  const deleteFolder = (id: string) => {
    setFolders(prev => removeFolderFromTree(prev, id));
  };

  const renderFolderItem = (folder: FolderItem, level: number = 0) => (
    <div key={folder.id} className="w-full">
      <FolderDropZone 
        id={`${folder.id}-drop-zone`} 
        isOver={overId === `${folder.id}-drop-zone`}
      >
        <DraggableFolderItem
          folder={folder}
          level={level}
          activeFolder={activeFolder}
          editingFolder={editingFolder}
          addingSubfolderTo={addingSubfolderTo}
          onFolderClick={setActiveFolder}
          onToggleFolder={toggleFolder}
          onEditFolder={setEditingFolder}
          onDeleteFolder={deleteFolder}
          onAddSubfolder={setAddingSubfolderTo}
          onSaveSubfolder={addFolder}
          onCancelSubfolder={() => setAddingSubfolderTo(null)}
        />
      </FolderDropZone>
      
      {folder.expanded && folder.children && (
        <div className="mt-1 space-y-1 animate-accordion-down">
          {folder.children.map(child => renderFolderItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  const activeFolderData = activeId ? findFolderById(folders, activeId) : null;

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={flattenTree(folders)} strategy={verticalListSortingStrategy}>
            <div className="space-y-1">
              {folders.map(folder => renderFolderItem(folder))}
            </div>
          </SortableContext>
          
          <DragOverlay>
            {activeFolderData && (
              <DraggableFolderItem
                folder={activeFolderData}
                level={0}
                activeFolder={activeFolder}
                editingFolder={editingFolder}
                addingSubfolderTo={addingSubfolderTo}
                onFolderClick={() => {}}
                onToggleFolder={() => {}}
                onEditFolder={() => {}}
                onDeleteFolder={() => {}}
                onAddSubfolder={() => {}}
                onSaveSubfolder={() => {}}
                onCancelSubfolder={() => {}}
                isDragOverlay={true}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
