
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { AddFolderInput } from "@/components/AddFolderInput";
import { FolderActions } from "@/components/FolderActions";

interface FolderItem {
  id: string;
  name: string;
  count: number;
  children?: FolderItem[];
  expanded?: boolean;
}

interface DraggableFolderItemProps {
  folder: FolderItem;
  level: number;
  activeFolder: string;
  editingFolder: string | null;
  addingSubfolderTo: string | null;
  onFolderClick: (id: string) => void;
  onToggleFolder: (id: string) => void;
  onEditFolder: (id: string) => void;
  onDeleteFolder: (id: string) => void;
  onAddSubfolder: (id: string) => void;
  onSaveSubfolder: (name: string, parentId: string) => void;
  onCancelSubfolder: () => void;
  isDragOverlay?: boolean;
}

export function DraggableFolderItem({
  folder,
  level,
  activeFolder,
  editingFolder,
  addingSubfolderTo,
  onFolderClick,
  onToggleFolder,
  onEditFolder,
  onDeleteFolder,
  onAddSubfolder,
  onSaveSubfolder,
  onCancelSubfolder,
  isDragOverlay = false,
}: DraggableFolderItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: folder.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full">
      <div
        {...attributes}
        {...listeners}
        className={`group w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing ${
          activeFolder === folder.id 
            ? 'bg-purple-50 text-purple-700 border border-purple-200 font-semibold' 
            : 'hover:bg-slate-50'
        } ${isDragOverlay ? 'shadow-lg border-2 border-purple-300' : ''}`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={() => onFolderClick(folder.id)}
      >
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFolder(folder.id);
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
            onEdit={() => onEditFolder(folder.id)}
            onDelete={() => onDeleteFolder(folder.id)}
            onAddSubfolder={() => onAddSubfolder(folder.id)}
          />
        </div>
      </div>
      
      {addingSubfolderTo === folder.id && (
        <div style={{ paddingLeft: `${28 + level * 16}px` }} className="mt-2">
          <AddFolderInput
            onSave={(name) => onSaveSubfolder(name, folder.id)}
            onCancel={onCancelSubfolder}
            placeholder="Subfolder name"
          />
        </div>
      )}
    </div>
  );
}
