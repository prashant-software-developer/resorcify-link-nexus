
import { useDroppable } from "@dnd-kit/core";

interface FolderDropZoneProps {
  id: string;
  children: React.ReactNode;
  isOver?: boolean;
}

export function FolderDropZone({ id, children, isOver }: FolderDropZoneProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver ? 'bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg' : ''
      }`}
    >
      {children}
    </div>
  );
}
