import Link from "next/link";
import Unlink from "@/components/Unlink";

export default async function Page() {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        프로필 설정
      </h2>
      <div
        className="flex flex-col py-[56px]">
        <Unlink />
      </div>
    </div>
  )
}