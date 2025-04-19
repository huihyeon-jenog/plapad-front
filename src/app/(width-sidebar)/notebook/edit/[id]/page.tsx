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
import useSWR, { mutate } from 'swr';
import { fetchFolders, FolderData } from '@/lib/data';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const folder = searchParams.get('folder');
  const router = useRouter();
  const editorRef = useRef(null);
  const { data: folderList } = useSWR('/api/folders', fetchFolders);
  const [title, setTitle] = useState('새 메모');
  const [content, setContent] = useState('');
  const [folderId, setFolderId] = useState(folder || folderList?.[0]?.id.toString());

  const fetchMemo = useCallback(
    async (id: string) => {
      try {
        const response = await callAPI('GET', `memo/${id}`);
        const { data } = response;

        setContent(data.content);
        setTitle(data.title);
        setFolderId(data.folderId?.toString());

        const editorInstance = editorRef.current as unknown as {
          getInstance: () => { setMarkdown: (v: string) => void };
        };

        if (editorRef.current && data.content) {
          editorInstance.getInstance().setMarkdown(data.content);
        }
      } catch (error) {
        console.error('Error fetching memo:', error);
        toast.error('메모를 불러오지 못했어요.');
        const detailLink = folder ? `/notebook?folder=${folder}` : `/notebook`;
        router.push(detailLink);
      }
    },
    [folder, router]
  );

  useEffect(() => {
    if (id) {
      fetchMemo(id as string);
    }
  }, [id, fetchMemo]);

  const onSelectFolder = (value: string) => {
    setFolderId(value);
  };

  const onUpdate = async () => {
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

      await callAPI('PATCH', `memo/${id}`, param);
      toast.success('메모를 수정했어요.');
      const notebookLink = folder ? `/notebook?folder=${folder}` : `/notebook`;

      mutate(notebookLink);
      router.replace(notebookLink); // push 대신 replace
    } catch (e) {
      console.error(`API 호출 실패 ${e}`);
    }
  };

  return (
    <div className="h-full">
      <div className="h-full">
        <div className="flex items-center gap-x-2 mb-4">
          <Select onValueChange={e => onSelectFolder(e)} value={folderId}>
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
          <Button className="h-[38px] w-[60px]" onClick={onUpdate}>
            수정
          </Button>
        </div>
        <div className="h-5/6">
          <Editor
            ref={editorRef}
            initialValue={content}
            toolbarItems={[['heading', 'bold', 'italic', 'strike', 'task']]}
            height="100%"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
          />
        </div>
      </div>
    </div>
  );
}
