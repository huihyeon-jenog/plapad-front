'use client';
import callAPI from '@/app/lib/callAPI';
import { CardItem } from '@/components/Notebooks/CardItem';
import { fetchFolderMemos, fetchMemos, MemoData } from '@/lib/data';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import MemoBulkActionsDrawer from './MemoBulkActionsDrawer';

export function CardList({ folderId }: { folderId?: string }) {
  const callId = folderId ? `/api/folders/memos/${folderId}` : '/api/memos';
  const callFn = folderId ? () => fetchFolderMemos(folderId) : fetchMemos;
  const { data, mutate } = useSWR(callId, callFn);
  const [memos, setMemos] = useState<MemoData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const setMemoOrders = async (target: MemoData, next: MemoData) => {
    try {
      if (target && next) {
        const param = {
          targetOrder: target.memoOrder,
          nextOrder: next.memoOrder,
        };

        await callAPI('PATCH', `memo/${target.id}`, param);
        toast.success('메모가 수정되었어요.');
      }
    } catch (e) {
      toast.success('매모 수정에 실패했어요.');
      console.error(`API 호출 실패 ${e}`);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = memos.findIndex((memo: MemoData) => memo.id === active.id);
      const newIndex = memos.findIndex((memo: MemoData) => memo.id === over?.id);
      setMemos(arrayMove(memos, oldIndex, newIndex));
      setMemoOrders(memos[oldIndex], memos[newIndex]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleMemoPin = async (memoId: string, isPinned: boolean) => {
    try {
      const param = {
        fixed: isPinned,
      };
      await callAPI('PATCH', `memo/${memoId}`, param);

      toast.success(isPinned ? '메모를 고정했어요.' : '메모를 고정 해제했어요.');
      mutate();
    } catch (e) {
      toast.error('메모 고정에 실패했어요.');
      console.error(`API 호출 실패 ${e}`);
    }
  };

  const handleMoveToFolder = async (targetId: string) => {
    try {
      const param = {
        folderId: targetId,
        memoIds: selectedIds,
      };
      await callAPI('PATCH', 'memos', param);
      toast.success('메모를 이동했어요.');
      setSelectedIds([]);
      mutate();
    } catch (e) {
      toast.error('메모 이동에 실패했어요.');
      console.error(`API 호출 실패 ${e}`);
    }
  };

  const handleDelete = async () => {
    try {
      const param = {
        ids: selectedIds,
      };
      await callAPI('DELETE', 'memos', param);
      toast.success('메모를 삭제했어요.');
      setSelectedIds([]);
      mutate();
    } catch (e) {
      toast.error('메모 삭제에 실패했어요.');
      console.error(`API 호출 실패 ${e}`);
    }
  };

  useEffect(() => {
    setMemos(data ?? []);
  }, [data]);

  if (memos?.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="text-2xl font-semibold mb-2">메모가 없습니다</div>
        <div className="text-sm">새 메모를 추가해보세요.</div>
      </div>
    );
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={memos?.map((memo: MemoData) => memo.id)}
          strategy={rectSortingStrategy}
        >
          {memos?.map((memo: MemoData) => (
            <CardItem
              key={memo.id}
              data={memo}
              isSelected={selectedIds.includes(memo.id)}
              hasSelected={selectedIds.length > 0}
              hasPin={memo.fixed}
              onToggleSelect={handleToggleSelect}
              onPin={handleMemoPin}
            />
          ))}
        </SortableContext>
      </DndContext>
      <MemoBulkActionsDrawer
        selectedIds={selectedIds}
        onClearSelection={() => setSelectedIds([])}
        onMove={handleMoveToFolder}
        onDelete={handleDelete}
      />
    </>
  );
}
