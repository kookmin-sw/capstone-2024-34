"use client";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { constrainedMemory } from "process";
import { useRouter } from "next/navigation";

function AuthError() {
  const router = useRouter();

  function pushPrevPage() {
    router.back();
  }

  return (
    <div className="h-screen bg-neutral-50">
      <div className="justify-centermax-w-screen-xl container mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <p className="text-3xl font-semibold">Platform GIPS</p>
          <p>생성형 침입방지 보안 플랫폼</p>
          <hr className="mt-2 h-1 bg-neutral-600" />

          <hr className="bg-brand-400 mb-5 mt-5 h-1 w-20 border-t-0 md:mb-0" />
          <h1 className="text-brand-400 mt-4 text-2xl font-bold sm:text-3xl">
            로그인 실패
          </h1>
          <p className="mx-auto mb-8 mt-2 max-w-md break-keep text-neutral-600">
            로그인중 에러가 발생하였습니다. <br /> 아이디/비밀번호를 확인후
            재로그인 하시기 바랍니다.
          </p>
          <button
            className="text-brand-400 inline-block hover:bg-transparent hover:text-neutral-400"
            onClick={pushPrevPage}
          >
            ↖ 로그인 재시도
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthError;
