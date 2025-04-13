import Sidebar from '@/components/Sidebar';
import { Toaster } from 'sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Toaster />
      <Sidebar />
      <div className="w-full h-full p-[24px] overflow-y-auto">{children}</div>
    </div>
  );
}
