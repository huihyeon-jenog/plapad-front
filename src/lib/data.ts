import callAPI from '@/app/lib/callAPI';

export interface FolderData {
  id: number;
  name: string;
  colorCode: string;
  folderOrder: number;
}

export interface MemoData {
  id: number;
  folderId: number;
  memoOrder: number;
  contents: string;
  fixed: boolean;
  tags: [];
  title: string;
}

export const fetchFolders = async () => {
  const response = await callAPI('GET', 'folders');

  return response.data;
};

export const fetchMemos = async () => {
  const response = await callAPI('GET', 'memos');

  return response.data;
};

export const fetchFolderMemos = async (id: string) => {
  const response = await callAPI('GET', `folder/${id}/memos`);

  return response.data;
};
