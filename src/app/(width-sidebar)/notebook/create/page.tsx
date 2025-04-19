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
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const folder = searchParams.get('folder');
  const router = useRouter();
  const editorRef = useRef(null);
  const { data: folderList } = useSWR('/api/folders', fetchFolders);
  const [title, setTitle] = useState('새 메모');
  const [folderId, setFolderId] = useState(folder || folderList?.[0]?.id.toString());

  useEffect(() => {
    setFolderId(folder || folderList?.[0]?.id.toString());
  }, [folder, folderList]);

  useEffect(() => {
    console.log('folderId', folderId);
  }, [folderId]);

  const onSelectFolder = (value: string) => {
    setFolderId(value);
  };

  const onSave = async () => {
    try {
      const editorInstance = editorRef.current as unknown as {
        getInstance: () => { getMarkdown: () => string };
      };
      if (!editorInstance) return;

      const content = editorInstance.getInstance().getMarkdown();

      const param = {
        folderId,
        title,
        content,
      };

      const response = await callAPI('POST', 'memo', param);
      const { data, message } = response;

      if (!data) {
        throw new Error(message);
      }

      toast.success('메모를 생성했어요.');

      const notebookLink = folder ? `/notebook?folder=${folder}` : `/notebook`;
      router.push(notebookLink);
    } catch (e) {
      console.error(`API 호출 실패 ${e}`);
    }
  };

  if (folderId === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="h-full">
        <div className="flex items-center gap-x-2 mb-4">
          <Select
            onValueChange={e => onSelectFolder(e)}
            defaultValue={folder || folderList?.[0]?.id.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
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
            toolbarItems={[['heading', 'bold', 'italic', 'strike', 'task']]}
            initialValue={''}
            height="100%"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
          />
        </div>
      </div>
    </div>
  );
}
