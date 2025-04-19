'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CSS } from '@dnd-kit/utilities';
import { MemoData } from '@/lib/data';
import { useSortable } from '@dnd-kit/sortable';
import { useRouter, useSearchParams } from 'next/navigation';
import { Viewer } from '@toast-ui/react-editor';
import { Checkbox } from '../ui/checkbox';
import { CheckIcon, Pin, PinOff } from 'lucide-react';
import { Indicator } from '@radix-ui/react-checkbox';

export function CardItem({
  data,
  isSelected,
  hasSelected,
  hasPin,
  onToggleSelect,
  onPin,
}: {
  data: MemoData;
  isSelected: boolean;
  hasSelected: boolean;
  hasPin: boolean;
  onToggleSelect: (id: string) => void;
  onPin: (id: string, isPinned: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const folder = searchParams.get('folder');
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (memoId: string) => {
    const detailLink = folder
      ? `/notebook?folder=${folder}&memoId=${memoId}`
      : `/notebook?memoId=${memoId}`;

    router.push(detailLink);
  };

  const isOverlay = isDragging || transform !== null;

  console.log(transform);
  return (
    <div className="relative group">
      {!isOverlay && (
        <>
          <Checkbox
            className="absolute top-2 left-2 size-[24px] opacity-0 group-hover:!opacity-100  appearance-none items-center justify-center rounded bg-white outline-none "
            style={{
              opacity: isSelected ? 1 : 0,
            }}
            checked={isSelected}
            onClick={() => onToggleSelect(data.id)}
          >
            <Indicator className="text-violet11">
              <CheckIcon />
            </Indicator>
          </Checkbox>
          {hasPin ? (
            <label className="absolute top-2 right-2 cursor-pointer">
              <Checkbox
                className="absolute left-[-999999px] opacity-0"
                checked={hasPin}
                onCheckedChange={() => onPin(data.id, false)}
              />
              <Pin size={20} className="bg-gray-50 rounded p-0.5 fill-primary-color" />
            </label>
          ) : (
            <label className="absolute top-2 right-2 opacity-0 group-hover:opacity-100  cursor-pointer ">
              <Checkbox
                className="absolute left-[-999999px] opacity-0 "
                checked={hasPin}
                onCheckedChange={() => onPin(data.id, true)}
              />
              <Pin size={20} className="bg-gray-50 rounded p-0.5" />
            </label>
          )}
        </>
      )}
      <Card
        className="h-[300px] hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => {
          if (hasSelected) {
            onToggleSelect(data.id);
          } else {
            handleClick(data.id);
          }
        }}
        ref={setNodeRef}
        style={{ ...style, backgroundColor: data.colorCode }}
        {...attributes}
      >
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-lg font-semibold truncate">{data.title}</CardTitle>
            {!hasSelected && (
              <span {...listeners} className="cursor-grab">
                ⠿
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Viewer initialValue={data.content} />
          <div className="flex flex-wrap gap-2 pt-2">
            {data.tags?.map((tag: string, idx: number) => (
              <span key={`memos_tag_${idx}`} className="text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
