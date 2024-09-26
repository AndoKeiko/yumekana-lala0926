import React from 'react';
import { Link } from '@inertiajs/react';  // Inertia.jsのLinkをインポート
import { IoIosLogIn, IoIosLogOut, IoMdHome } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
import UserInfo from '@/Components/UserInfo';

const Sidebar = ({ auth, handleLogout }) => {
  return (
    <nav className="w-16 bg-gray-600 text-white flex flex-col items-start py-10 text-xs h-full">
      <div className="flex flex-col items-center justify-center">
        <UserInfo />
        <Link href={route('home')} className="p-2"><IoMdHome /> ホーム</Link>
        <Link href={route('goals')} className="p-2"><TbTargetArrow /> 目標</Link>
        <Link href={route('tasks')} className="p-2"><MdOutlineTaskAlt />タスクリスト</Link>
        <Link href={route('posts.create')} className="p-2"><FaBookOpen />学習記録</Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-auto">
        {auth.user ? (
          <button onClick={handleLogout} className="p-2"><IoIosLogOut /> ログアウト</button>
        ) : (
          <Link href={route('login')} className="p-2"><IoIosLogIn /> ログイン</Link>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;