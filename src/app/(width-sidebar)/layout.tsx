import Sidebar from "@/components/Sidebar";

export default function Layout({children}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <Sidebar/>
      <div className="w-full p-[24px]">
        {children}
      </div>
    </div>
  );
}
