import { CardList } from '@/components/Notebooks/CardList';

interface Prams {
  id: string;
}

export default async function Page({ params }: { params: Prams }) {
  const { id } = await params;

  return (
    <div className="grid grid-cols-6 gap-4">
      <CardList folderId={id} />
    </div>
  );
}
