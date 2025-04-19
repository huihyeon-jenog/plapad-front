'use client';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import callAPI from '@/app/lib/callAPI';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Viewer } from '@toast-ui/react-editor';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Pencil, Trash2, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { mutate } from 'swr';

type Memo = {
  id: number;
  title: string;
  content: string;
};

export default function MemoDetailModal() {
  const searchParams = useSearchParams();
  const folder = searchParams.get('folder');
  const router = useRouter();
  const memoId = searchParams.get('memoId');
  const [memo, setMemo] = useState<Memo | null>(null);

  const fetchMemo = async (id: string) => {
    try {
      const response = await callAPI('GET', `memo/${id}`);
      const { data } = response;

      setMemo(data);
    } catch (error) {
      console.error('Error fetching memo:', error);
      setMemo(null);
      toast.error('메모를 불러오지 못했어요.');
      const detailLink = folder ? `/notebook?folder=${folder}` : `/notebook`;
      router.push(detailLink);
    }
  };

  useEffect(() => {
    if (memoId) {
      fetchMemo(memoId);
    }
  }, [memoId]);

  //메모 삭제 이벤트
  const handleDelete = async () => {
    if (!memoId) return;
    try {
      await callAPI('DELETE', `memo/${memoId}`);

      toast.success('메모가 삭제되었어요.');
      setMemo(null);

      const callId = folder ? `/api/folders/memos/${folder}` : '/api/memos';
      mutate(callId);
    } catch (error) {
      console.error('Error deleting memo:', error);
    }
  };

  const handleClose = () => {
    const detailLink = folder ? `/notebook?folder=${folder}` : `/notebook`;

    setMemo(null);
    router.push(detailLink);
  };

  // 수정페이지로 이동
  const handleEdit = () => {
    if (!memoId) return;

    const detailLink = folder
      ? `/notebook/edit/${memoId}?folder=${folder}`
      : `/notebook/edit/${memoId}`;
    setMemo(null);
    router.push(detailLink);
  };

  if (!memoId || !memo) return null;

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="[&>button]:hidden max-w-[800px] h-[700px] p-2">
        <div>
          <div className="absolute top-0 left-0 right-0 flex items-center justify-end border-b">
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
          <DialogHeader className="mt-8">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">{memo.title}</DialogTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                  <Pencil className="w-5 h-5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>메모를 삭제하시겠어요?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </DialogHeader>
          <div className="py-2">
            <Viewer initialValue={memo.content} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
