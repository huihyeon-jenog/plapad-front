'use client';
import { useState } from 'react';
import FolderForm from './FolderForm';
import FolderList from './FolderList';
import { FolderData } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { usePathname } from 'next/navigation';

export default function FolderManagement({ items }: { items: FolderData[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('INSERT');
  const [folderData, setFolderData] = useState<FolderData | null>(null);
  const pathname = usePathname();
  const folderId = pathname.split('/')[2];

  const onOpen = (mode: 'INSERT' | 'UPDATE') => {
    setMode(mode);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onFolderData = (data: FolderData) => {
    console.log(data, 'datra');
    setFolderData(data);
  };

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <FolderList items={items} onOpen={() => onOpen('INSERT')} onFolderData={onFolderData} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6C12.75 6.41421 12.4142 6.75 12 6.75C11.5858 6.75 11.25 6.41421 11.25 6C11.25 5.58579 11.5858 5.25 12 5.25ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25ZM12 17.25C12.4142 17.25 12.75 17.5858 12.75 18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18C11.25 17.5858 11.5858 17.25 12 17.25Z"
                fill="black"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled={folderId === undefined} onClick={() => onOpen('UPDATE')}>
              폴더 수정
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && <FolderForm onClose={onClose} mode={mode} folderData={folderData} />}
    </>
  );
}
