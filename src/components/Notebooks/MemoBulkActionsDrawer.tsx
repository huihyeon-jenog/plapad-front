'use client';

import { Button } from '@/components/ui/button';
import { fetchFolders, FolderData } from '@/lib/data';
import useSWR from 'swr';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MemoBulkActionsDrawer({
  selectedIds,
  onClearSelection,
  onMove,
  onDelete,
}: {
  selectedIds: string[];
  onClearSelection: () => void;
  onMove: (e: string) => void;
  onDelete: () => void;
}) {
  const { data: folderList } = useSWR('/api/folders', fetchFolders);
  const hasSelected = selectedIds.length > 0;

  if (!hasSelected) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="text-sm text-gray-600">{selectedIds.length}개의 메모 선택됨</div>
      <div className="flex gap-3">
        <Select onValueChange={e => onMove(e)}>
          <SelectTrigger>
            <SelectValue placeholder="폴더 이동" />
          </SelectTrigger>
          <SelectContent>
            {folderList?.map((folder: FolderData) => {
              return (
                <SelectItem key={folder.id} value={folder.id.toString()}>
                  {folder.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button onClick={onDelete}>삭제</Button>
        <Button variant="outline" onClick={onClearSelection}>
          선택 취소
        </Button>
      </div>
    </div>
  );
}
