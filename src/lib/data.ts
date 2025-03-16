import callAPI from '@/app/lib/callAPI';

export interface FolderData {
  id: number;
  name: string;
  colorCode: string;
  folderOrder: number;
}

export const fetchFolders = async () => {
  const response = await callAPI('GET', 'folders');

  return response.data;
};
