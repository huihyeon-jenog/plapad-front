import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { FolderData } from '@/lib/data';

export function SortableItem(props: { folder: FolderData; activeId: string }) {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.folder.id,
  });

  const folderData = props.folder;
  const activeId = props.activeId;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Button
        variant={Number(activeId) === folderData.id ? undefined : 'outline'}
        className={`rounded-2xl py-1`}
        onClick={() => router.replace(`/notebook/${folderData.id}`)}
      >
        {folderData.name}
        <span {...listeners} className="cursor-grab">
          ⠿
        </span>
      </Button>
    </div>
  );
}
