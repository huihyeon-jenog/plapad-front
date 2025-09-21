'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import callAPI from '@/app/lib/callAPI';
import { deleteToken, getToken } from '@/app/lib/session';
import { deleteUserInfo } from '@/app/lib/clientSession';
import Image from 'next/image';
import Loading from '@/components/Loading';
import HomeIcon from '@/components/Icons/Home';
import NotebookIcon from '@/components/Icons/Notebook';
import TaskIcon from '@/components/Icons/Task';
import CalendarIcon from '@/components/Icons/Calendar';
import TagIcon from '@/components/Icons/Tag';
import LogoutIcon from '@/components/Icons/Logout';
import SettingIcon from '@/components/Icons/Setting';
import { setUserInfo } from '@/app/lib/clientSession';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    socialType: '',
    name: '',
    email: '',
    avatar: '',
  });

  const getUserInfo = async () => {
    const token = await getToken();
    if (token === 'GUEST') {
      setUser({
        socialType: '',
        name: 'GUEST',
        email: '',
        avatar: '',
      });
    } else {
      try {
        const response = await callAPI('GET', 'me');

        setUser({
          ...response.data,
        });
      } catch (e) {
        setUser({
          socialType: '',
          name: '',
          email: '',
          avatar: '',
        });
        console.error(`getUserInfo ${e}`);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const logout = async () => {
    try {
      await callAPI('POST', 'logout');
      await deleteToken();
      deleteUserInfo();
      router.replace('/login');
    } catch (e) {
      console.error(`unlink ${e}`);
    }
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const folder = searchParams.get('folder');
  const memoLink = folder ? `/notebook/create?folder=${folder}` : '/notebook/create';
  const isCalendarPage = pathname.startsWith('/calendar');

  return (
    <nav
      className={`inline-flex flex-col w-[266px] p-[24px] border-r shadow bg-light-gray-1 
      ${isCalendarPage ? 'w-20 items-center' : 'w-60'}
    `}
    >
      {isLoading && <Loading />}
      <UserProfile user={user} isCalendarPage={isCalendarPage} />
      <div className="flex flex-col justify-between h-full">
        {!isCalendarPage && (
          <Link href={memoLink} className="mb-4">
            <Button className="w-full text-base font-semibold py-6 rounded-xl bg-primary text-white hover:bg-primary/90 transition">
              <Pencil className="mr-2 h-4 w-4" />
              메모쓰기
            </Button>
          </Link>
        )}
        <NavLinks isCalendarPage={isCalendarPage} />
        <LogoutButton logout={logout} isCalendarPage={isCalendarPage} />
      </div>
    </nav>
  );
}

const UserProfile = ({
  user,
  isCalendarPage,
}: {
  user: Record<string, string>;
  isCalendarPage: boolean;
}) => {
  const router = useRouter();

  if (isCalendarPage) {
    return (
      <div className="flex gap-[12px] mb-[44px]">
        <button
          type="button"
          className="relative inline-flex items-center shrink-0 justify-center w-[56px] h-[56px] rounded-[16px] dark:bg-gray-600 overflow-hidden"
          onClick={() => router.push('/profile')}
        >
          {user.avatar ? (
            <Image src={user.avatar} alt={'사용자 프로필'} width={56} height={56} />
          ) : (
            <span className="font-medium text-gray-600 dark:text-gray-300">{user.name[0]}</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-[12px] mb-[44px]">
      <div className="relative inline-flex items-center shrink-0 justify-center w-[56px] h-[56px] rounded-[16px] dark:bg-gray-600 overflow-hidden">
        {user.avatar ? (
          <Image src={user.avatar} alt={'사용자 프로필'} width={56} height={56} />
        ) : (
          <span className="font-medium text-gray-600 dark:text-gray-300">{user.name[0]}</span>
        )}
      </div>
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="flex justify-between">
          <strong className="">{user.name}</strong>
          <Link href={'/profile'} className="flex items-center transition duration-200">
            <SettingIcon />
          </Link>
        </div>
        <span className="text-sm overflow-hidden text-ellipsis">{user.email}</span>
      </div>
    </div>
  );
};

const NavLinks = (props: { isCalendarPage: boolean }) => {
  const { isCalendarPage } = props;
  const links = [
    { href: '/', icon: <HomeIcon />, label: 'Home' },
    { href: '/notebook', icon: <NotebookIcon />, label: 'Notebooks' },
    { href: '/tasks', icon: <TaskIcon />, label: 'Tasks' },
    { href: '/calendar', icon: <CalendarIcon />, label: 'Calendar' },
    { href: '/tag', icon: <TagIcon />, label: 'Tags' },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-full">
      <ul>
        {links.map(link => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`${
                  isActive ? 'bg-light-gray-2 text-primary-color' : ''
                } flex gap-[16px] p-[16px] hover:bg-light-gray-2 hover:text-primary-color rounded-[16px]`}
              >
                {link.icon}
                {!isCalendarPage && link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const LogoutButton = ({
  logout,
  isCalendarPage,
}: {
  logout: () => void;
  isCalendarPage: boolean;
}) => {
  return (
    <ul>
      <li>
        <button
          className="flex gap-[16px] p-[16px] hover:bg-light-gray-2 hover:text-primary-color rounded-[16px]"
          onClick={logout}
        >
          <LogoutIcon />
          {!isCalendarPage && 'Logout'}
        </button>
      </li>
    </ul>
  );
};
