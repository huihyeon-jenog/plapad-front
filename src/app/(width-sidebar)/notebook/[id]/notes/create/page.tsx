'use client';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import callAPI from '@/app/lib/callAPI';
import useSWR from 'swr';
import { fetchFolders, FolderData } from '@/lib/data';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';

export default function Page() {
  console.log('???');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const editorRef = useRef(null);
  const { data: folderList } = useSWR('/api/folders', fetchFolders);
  const [folderId, setFolderId] = useState(params.id);
  const [title, setTitle] = useState('새 메모');

  useEffect(() => {
    if (folderList) {
      const initFolderData =
        folderList.find((folder: FolderData) => folder.id === Number(folderId)) ?? folderList[0];
      setFolderId(initFolderData.id.toString());
    }
  }, [folderList, folderId, params.id]);

  const onSave = async () => {
    try {
      const editorInstance = editorRef.current as any;
      if (!editorInstance) return;

      const contents = editorInstance.getInstance().getMarkdown();

      const param = {
        folderId,
        title,
        contents,
        fixed: true,
      };

      const response = await callAPI('POST', 'memo', param);
      const { data, message } = response;

      if (!data) {
        throw new Error(message);
      }

      const notebookId = pathname.match(/^\/notebook\/(\d+)/)?.[1] ?? '';

      toast.success('메모를 생성했어요.');
      router.push(`/notebook/${notebookId}`);
    } catch (e) {
      console.error(`API 호출 실패 ${e}`);
    }
  };

  if (!folderId || folderId === '0' || !folderList) {
    return <>Loading...</>;
  } else {
    return (
      <div className="h-full">
        <div className="h-full">
          <div className="flex items-center gap-x-2 mb-4">
            <Select onValueChange={e => console.log(e, 'eee')} defaultValue={folderId.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {folderList.map((folder: FolderData) => {
                  return (
                    <SelectItem key={folder.id} value={folder.id.toString()}>
                      {folder.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
            />
            <Button className="h-[38px] w-[60px]" onClick={onSave}>
              저장
            </Button>
          </div>
          <div className="h-5/6">
            <Editor
              ref={editorRef}
              initialValue={''}
              previewStyle="vertical" // or "tab"
              height="100%"
              initialEditType="wysiwyg"
              hideModeSwitch={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
