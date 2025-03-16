import FolderManagement from '@/components/Notebooks/FolderManagement';
import { fetchFolders, FolderData } from '@/lib/data';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const items: FolderData[] = await fetchFolders();

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Notebooks</h2>
        <FolderManagement items={items} />
      </div>
      <div className="w-full p-[24px]">{children}</div>
    </div>
  );
}
