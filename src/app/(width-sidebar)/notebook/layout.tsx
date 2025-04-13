import FolderManagement from '@/components/Notebooks/FolderManagement';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Notebooks</h2>
        <FolderManagement />
      </div>
      <div className="w-full p-[24px] h-full">{children}</div>
    </div>
  );
}
