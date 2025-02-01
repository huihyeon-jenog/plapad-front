"use client"
import Link from "next/link";
import {useState, useEffect} from "react";
import callAPI from "@/app/lib/callAPI";
import {getToken} from "@/app/lib/session";
import Image from "next/image";
import Loading from "@/components/Loading";
import HomeIcon from "@/components/Icons/Home";
import NotebookIcon from "@/components/Icons/Notebook";
import TaskIcon from "@/components/Icons/Task";
import CalendarIcon from "@/components/Icons/Calendar";
import TagIcon from "@/components/Icons/Tag";
import LogoutIcon from "@/components/Icons/Logout";

export default function Sidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const getUserInfo = async () => {
    // const response = await callAPI("GET", "me");

    const token = await getToken();
    if (token === "GUEST") {
      setUser({
        name: 'GUEST',
        email: '',
        avatar: ''
      })
    } else {
      try {
        const response = await callAPI("GET", "me");

        setUser({
          ...response.data
        })
      } catch (e) {
        setUser({
          name: "",
          email: "",
          avatar: ""
        })
        console.error(`getUserInfo ${e}`);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <nav className="inline-flex flex-col p-[24px] border-r shadow bg-light-gray-1">
      {
        isLoading && <Loading/>
      }
      <UserProfile user={user}/>
      <div className="flex flex-col justify-between h-full">
        <NavLinks />
        <LogoutButton />
      </div>
    </nav>
  )
}

const UserProfile = ({user}: {
  user: Record<string, string>
}) => {
  return (
    <div className="flex gap-[24px] mb-[44px]">
      <div
        className="relative inline-flex items-center justify-center w-[56px] h-[56px] rounded-[16px] dark:bg-gray-600 overflow-hidden">
        {
          user.avatar ? <Image src={user.avatar} alt={"사용자 프로필"} width={56} height={56}/> :
            <span className="font-medium text-gray-600 dark:text-gray-300">{user.name[0]}</span>
        }
      </div>

      <div className="flex flex-col justify-center w-[156px]">
        <strong className="">{user.name}</strong>
        <span className="text-sm">{user.email}</span>
      </div>
    </div>
  )
}

const NavLinks = () => {
  const links = [
    {href: "/", icon: <HomeIcon/>, label: "Home"},
    {href: "/notebook", icon: <NotebookIcon/>, label: "Notebooks"},
    {href: "/tasks", icon: <TaskIcon/>, label: "Tasks"},
    {href: "/Calendar", icon: <CalendarIcon/>, label: "Calendar"},
    {href: "/Tag", icon: <TagIcon/>, label: "Tags"},
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <ul>
        {links.map(link => (
          <li key={link.label}>
            <Link href={link.href} className="flex gap-[16px] p-[16px] hover:bg-light-gray-2 rounded-[16px]">
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const LogoutButton = () => {
  return (
    <ul>
      <li>
        <Link href={"/api/auth/logout"} className="flex gap-[16px] p-[16px] hover:bg-light-gray-2 rounded-[16px]">
          <LogoutIcon/>
          Logout
        </Link>
      </li>
    </ul>
  )
}