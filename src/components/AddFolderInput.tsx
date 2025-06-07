
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddFolderInputProps {
  onSave: (name: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export function AddFolderInput({ onSave, onCancel, placeholder = "Folder name" }: AddFolderInputProps) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onSave(folderName.trim());
      setFolderName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border">
      <Input
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-8 text-sm border-slate-200 focus:border-purple-300"
        autoFocus
      />
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="w-8 h-8 p-0 hover:bg-green-100 hover:text-green-700"
        disabled={!folderName.trim()}
      >
        <Check className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onCancel}
        className="w-8 h-8 p-0 hover:bg-red-100 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </form>
  );
}
