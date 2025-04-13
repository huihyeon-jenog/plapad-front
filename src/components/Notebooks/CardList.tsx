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

export function CardList({ folderId }: { folderId?: string }) {
  const callId = folderId ? `/api/folders/memos/${folderId}` : '/api/memos';
  const callFn = folderId ? () => fetchFolderMemos(folderId) : fetchMemos;
  const { data } = useSWR(callId, callFn);
  const [memos, setMemos] = useState<MemoData[]>([]);

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

  useEffect(() => {
    setMemos(data ?? []);
  }, [data]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={memos?.map((memo: MemoData) => memo.id)}
        strategy={rectSortingStrategy}
      >
        {memos?.map((memo: MemoData) => (
          <CardItem key={memo.id} data={memo} folderId={memo.folderId} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
