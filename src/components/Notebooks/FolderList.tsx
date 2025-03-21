'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FolderData } from '@/lib/data';

export default function FolderList({
  items,
  onOpen,
  onFolderData,
}: {
  items: FolderData[];
  onOpen: () => void;
  onFolderData: (data: FolderData) => void;
}) {
  const router = useRouter();

  const onFolderClick = (id: number) => {
    const getData = items.find(item => item.id === id);

    onFolderData(
      getData ?? {
        id: 0,
        name: '',
        colorCode: '',
        folderOrder: 0,
      }
    );
    router.replace(`/notebook/${id}`);
  };

  return (
    <div className="flex my-4 items-center space-x-2 px-2 w-full">
      <Button variant="ghost" size="icon" className="[&_svg]:size-[24px]" onClick={onOpen}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75003 13.5C8.75003 13.0858 9.08582 12.75 9.50003 12.75H11.25V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V12.75H14.5C14.9142 12.75 15.25 13.0858 15.25 13.5C15.25 13.9142 14.9142 14.25 14.5 14.25H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V14.25H9.50003C9.08582 14.25 8.75003 13.9142 8.75003 13.5Z"
            fill="#7B68EE"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.1613 9.74679C21.5581 12.233 21.5297 14.7686 21.0772 17.2453C20.8748 18.353 19.9484 19.1833 18.8253 19.2636L17.1874 19.3808C13.7336 19.6279 10.2665 19.6279 6.81264 19.3808L5.29864 19.2725C4.10261 19.1869 3.1161 18.3027 2.90058 17.1232C2.46392 14.7333 2.38916 12.2913 2.67882 9.87915L2.9513 7.61004C3.11301 6.26343 4.25541 5.25 5.6117 5.25H7.90327C9.02102 5.25 9.95229 6.04846 10.1578 7.10612L18.4722 7.10612C19.7786 7.10612 20.8913 8.05533 21.0972 9.34535L21.1613 9.74679ZM19.6016 16.9757C20.0236 14.6662 20.0501 12.3017 19.6801 9.98322L19.616 9.58178C19.5263 9.0197 19.0414 8.60612 18.4722 8.60612H9.75939C9.17432 8.60612 8.70003 8.13183 8.70003 7.54677C8.70003 7.10672 8.34331 6.75 7.90327 6.75H5.6117C5.01467 6.75 4.51179 7.19611 4.4406 7.78888L4.16812 10.058C3.89639 12.3208 3.96652 14.6116 4.37615 16.8536C4.46868 17.36 4.8922 17.7396 5.40568 17.7763L6.91968 17.8846C10.3023 18.1266 13.6978 18.1266 17.0804 17.8846L18.7183 17.7674C19.1588 17.7359 19.5222 17.4102 19.6016 16.9757Z"
            fill="#7B68EE"
          />
        </svg>
      </Button>

      <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
        <Button
          variant="outline"
          className={`rounded-2xl py-1`}
          onClick={() => router.replace(`/notebook/`)}
        >
          전체
        </Button>
        {items?.map((folder, index) => (
          <Button
            key={index}
            variant="outline"
            className={`rounded-2xl py-1`}
            onClick={() => onFolderClick(folder.id)}
          >
            {folder.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
