"use client";

import Link from "next/link";
import {useState} from "react";
import Loading from "@/components/Loading";

export default function SignInPage(props: any) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      {
        isLoading && <Loading />
      }
      <div
        className="max-w-[560px] w-full mx-4 flex flex-col px-[48px] py-[56px] border border-gray-300 rounded-lg">
        <h2 className="text-3xl font-bold">
          로그인
        </h2>
        <div className="w-full my-[40px] flex flex-col items-center gap-[24px]">
          <Link
            href={`/api/auth/guest`}
            className="flex w-full items-center justify-center gap-[8px] h-[45px] px-[14px] bg-[#fff] rounded-[6px] hover:brightness-90 transition duration-200 border"
            onClick={() => setIsLoading(true)}
          >
            <span className="text-[#000000D9] font-semibold">
              게스트 로그인
            </span>
          </Link>
          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=8b6c42904960d9ec098f253e14d0343b&redirect_uri=http://localhost:3000/api/auth/kakao&response_type=code`}
            className="flex w-full items-center justify-center gap-[8px] h-[45px] px-[14px] bg-[#FEE500] rounded-[6px] hover:brightness-90 transition duration-200"
            onClick={() => setIsLoading(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_103_60)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0001 0.800003C5.37225 0.800003 0 4.95061 0 10.0697C0 13.2534 2.07788 16.06 5.24205 17.7293L3.91072 22.5927C3.7931 23.0224 4.28457 23.3649 4.66197 23.1159L10.4978 19.2643C10.9903 19.3118 11.4908 19.3395 12.0001 19.3395C18.6274 19.3395 24 15.1891 24 10.0697C24 4.95061 18.6274 0.800003 12.0001 0.800003Z"
                  fill="black"
                  fillOpacity="0.85"
                />
              </g>
              <defs>
                <clipPath id="clip0_103_60">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span className="text-[#000000D9] font-semibold">
              카카오 로그인
            </span>
          </Link>
          <Link
            href={`https://nid.naver.com/oauth2.0/authorize?client_id=cHPEMOAH1qRIOqnGRBum&redirect_uri=http://localhost:3000/api/auth/naver&response_type=code`}
            className="flex w-full items-center justify-center gap-[8px] h-[45px] px-[14px] bg-[#03C75A] rounded-[6px] hover:brightness-90 transition duration-200"
            onClick={() => setIsLoading(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_4_163)">
                <path d="M13.5614 10.7033L6.14609 0H0V20H6.43861V9.295L13.8539 20H20V0H13.5614V10.7033Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_4_163">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span className="text-[#FFF] font-semibold">
              네이버 로그인
            </span>
          </Link>
          <Link
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=573317049906-3i9u2l155ngjphi69es79htu3gq1jbkr.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}
            className="flex w-full items-center justify-center gap-[8px] h-[45px] px-[14px] bg-[#fff] rounded-[6px] hover:brightness-90 transition duration-200 border"
            onClick={() => setIsLoading(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M19.6 10.2273C19.6 9.51819 19.5364 8.83637 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z"
                    fill="#4285F4"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5772L13.3864 15.0681C12.4909 15.6681 11.3455 16.0227 10 16.0227C7.39546 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z"
                    fill="#34A853"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M4.40455 11.8999C4.20455 11.2999 4.09091 10.659 4.09091 9.99994C4.09091 9.34085 4.20455 8.69994 4.40455 8.09994V5.50903H1.06364C0.386364 6.85903 0 8.38631 0 9.99994C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.8999Z"
                    fill="#FBBC05"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39546 3.97727 10 3.97727Z"
                    fill="#EA4335"/>
            </svg>
            <span className="text-[#000] font-semibold">
              구글 로그인
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// https://accounts.google.com/o/oauth2/v2/auth