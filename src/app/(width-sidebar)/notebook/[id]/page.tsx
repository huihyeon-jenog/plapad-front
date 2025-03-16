interface Prams {
  id: string;
}

export default async function Page({ params }: { params: Prams }) {
  const { id } = await params;

  return <div>특정 폴더 리스트{id}</div>;
}
