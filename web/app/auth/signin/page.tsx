"use client";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { constrainedMemory } from "process";

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
    <div className="h-screen bg-neutral-50">
      <div className="justify-centermax-w-screen-xl container mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <p className="text-3xl font-semibold">Platform GIPS</p>
          <p>생성형 침입방지 보안 플랫폼</p>
          <hr className="mt-2 h-1 bg-neutral-600" />
          <p className="mt-2 max-w-md break-keep text-neutral-600">
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
                  className="w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
                  className="w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="비밀번호 입력"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full bg-neutral-400 px-5 py-3 text-sm font-medium text-white"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
