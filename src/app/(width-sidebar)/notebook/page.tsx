import FolderManagement from '@/components/Notebooks/FolderManagement';

export default async function Page() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Notebooks</h2>
      <FolderManagement />
    </div>
  );
}
