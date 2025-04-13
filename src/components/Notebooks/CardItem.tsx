'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CSS } from '@dnd-kit/utilities';
import { MemoData } from '@/lib/data';
import { useSortable } from '@dnd-kit/sortable';
import { useRouter } from 'next/navigation';

export function CardItem({ data, folderId }: { data: MemoData; folderId: number }) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className="h-[300px] hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/notebook/${folderId}/notes/${data.id}`)}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg font-semibold truncate">{data.title}</CardTitle>
        <span {...listeners} className="cursor-grab">
          ⠿
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{data.contents}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags?.map((tag: string, idx: number) => (
            <span key={`memos_tag_${idx}`} className="text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
