import CalendarSidebar from '@/components/Calendar/CalendarSideBar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full gap-[24px]">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <aside className="w-[180px] border-r border-gray-200 bg-white shrink-0">
          <CalendarSidebar />
        </aside>
      </div>
      <div className="flex w-full">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
