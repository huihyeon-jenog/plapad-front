import { CardList } from '@/components/Notebooks/CardList';
import MemoDetailModal from '@/components/Notebooks/MemoDetailModal';

export default async function Page({ searchParams }: { searchParams: { folder: string } }) {
  const { folder: folderId } = await searchParams;

  return (
    <div className="grid grid-cols-6 gap-4">
      <CardList folderId={folderId} />
      <MemoDetailModal />
    </div>
  );
}
