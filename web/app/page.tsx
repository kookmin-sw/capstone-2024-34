/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

function SignIn() {
  const [userID, setUserId] = useState("");
  const [userPW, setUserPW] = useState("");

  // 수정된 부분
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      username: userID,
      password: userPW,
      redirect: true,
      callbackUrl: "/dashboard/",
    });

    console.log(result);
    // if (result?.error) {
    //   alert("로그인에 실패하였습니다.");
    // }
  };

  return (
    <div className="relative flex flex-wrap bg-neutral-50 lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/3 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg">
          <Image
            className="mb-2 inline-block rounded-full ring-2 ring-white"
            src="/images/kmu.png"
            alt="kmu"
            width={64}
            height={64}
          />
          <p className="text-3xl font-semibold">Platform GIPS</p>
          <p>생성형 침입방지 보안 플랫폼</p>
          <hr className="mt-2 h-1 bg-neutral-500" />
          <p className="mt-2 break-keep text-sm font-thin text-neutral-400">
            본 시스템은 허가된 사용자만 이용하실 수 있습니다. 부당한 방법으로
            전산망에 접속하거나 정보를 삭제/변경/유출하는 사용자는 관련법령에
            따라 처벌 받게 됩니다.
          </p>

          <hr className="bg-brand-400 mb-5 mt-5 h-1 w-20 border-t-0 md:mb-0" />

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 text-neutral-800"
          >
            <h1 className="text-brand-400 text-xl font-bold">로그인</h1>

            <div>
              <label htmlFor="email" className="sr-only">
                아이디
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 "
                  placeholder="아이디 입력"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  onChange={(e) => setUserPW(e.target.value)}
                  className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 "
                  placeholder="비밀번호 입력"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
            >
              로그인
            </button>
          </form>
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-2/3">
        <img
          alt="login"
          src="https://images.unsplash.com/photo-1655635643486-a17bc48771ff?q=100&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignIn;
