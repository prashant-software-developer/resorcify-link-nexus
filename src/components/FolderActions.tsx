
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FolderActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onAddSubfolder: () => void;
}

export function FolderActions({ onEdit, onDelete, onAddSubfolder }: FolderActionsProps) {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <Button
        size="sm"
        variant="ghost"
        onClick={onEdit}
        className="w-6 h-6 p-0 hover:bg-blue-100 hover:text-blue-700"
      >
        <Edit className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onAddSubfolder}
        className="w-6 h-6 p-0 hover:bg-green-100 hover:text-green-700"
      >
        <Plus className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onDelete}
        className="w-6 h-6 p-0 hover:bg-red-100 hover:text-red-700"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
}
