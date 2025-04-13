'use client';

import callAPI from '@/app/lib/callAPI';
import { deleteToken } from '@/app/lib/session';
import { useRouter } from 'next/navigation';
import { getUserInfo, deleteUserInfo } from '@/app/lib/clientSession';

export default function Unlink() {
  const router = useRouter();
  const userInfo = getUserInfo();

  const unlink = async () => {
    try {
      const parma = {
        socialType: userInfo?.socialType,
      };

      await callAPI('DELETE', 'unlink', parma);
      await deleteToken();
      deleteUserInfo();
      router.replace('/login');
    } catch (e) {
      console.error(`unlink ${e}`);
    }
  };

  return (
    <button
      className="inline-flex w-[120px] items-center justify-center gap-[8px] h-[45px] px-[14px] rounded-[6px] hover:brightness-90 transition duration-200 border"
      onClick={unlink}
    >
      <span className="font-semibold">계정 삭제</span>
    </button>
  );
}
