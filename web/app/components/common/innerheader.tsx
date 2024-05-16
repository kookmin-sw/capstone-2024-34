"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function InnerHeader() {
  const { data: session } = useSession();
  // console.log("session", session);
  if (session && session.user) {
    return (
      <header className="sticky inset-x-0 top-0 z-[48] flex h-16 w-full flex-wrap border-b bg-white py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4 lg:ps-64">
        <nav
          className="mx-auto flex w-full basis-full items-center px-4 sm:px-6"
          aria-label="Global"
        >
          <button
            type="button"
            className="me-3 flex items-center justify-center gap-x-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:text-gray-600 lg:hidden"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Sidebar"
          >
            <svg
              className="size-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
            </svg>
            <span className="sr-only">Sidebar</span>
          </button>

          <div className="me-5 lg:me-0 lg:hidden">
            {/* Logo */}
            <Link
              className="inline-block flex-none rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
              href="/dashboard"
            >
              Platform GIPS
            </Link>
            {/* End Logo */}
          </div>

          <div className="ms-auto flex  items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
            <div className="hidden sm:block"></div>

            <div className="flex flex-row items-center justify-end gap-2">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Image
                    className="inline-block rounded-full ring-2 ring-white"
                    src="/images/kmu.png"
                    alt="kmu"
                    width={38}
                    height={38}
                  />
                </button>

                <div
                  className="hs-dropdown-menu duration hidden min-w-60 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="-m-2 rounded-t-lg bg-gray-100 px-5 py-3">
                    <p className="text-sm text-gray-600">
                      {session.user.name}님 환영합니다!
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                      onClick={() => signOut()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      로그아웃
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="sticky inset-x-0 top-0 z-[48] flex h-16 w-full flex-wrap border-b bg-white py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4 lg:ps-64">
        <nav
          className="mx-auto flex w-full basis-full items-center px-4 sm:px-6"
          aria-label="Global"
        >
          <button
            type="button"
            className="me-3 flex items-center justify-center gap-x-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:text-gray-600 lg:hidden"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Sidebar"
          >
            <svg
              className="size-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
            </svg>
            <span className="sr-only">Sidebar</span>
          </button>

          <div className="me-5 lg:me-0 lg:hidden">
            {/* Logo */}
            <Link
              className="inline-block flex-none rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
              href="/dashboard"
            >
              Platform GIPS
            </Link>
            {/* End Logo */}
          </div>

          <div className="ms-auto flex  items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
            <div className="hidden sm:block"></div>

            <div className="flex flex-row items-center justify-end gap-2">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Image
                    className="inline-block rounded-full ring-2 ring-white"
                    src="/images/kmu.png"
                    alt="kmu"
                    width={38}
                    height={38}
                  />
                </button>

                <div
                  className="hs-dropdown-menu duration hidden min-w-60 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="-m-2 rounded-t-lg bg-gray-100 px-5 py-3">
                    <p className="text-sm text-gray-700">로그인이 필요합니다</p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                      onClick={() => signIn()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                        />
                      </svg>
                      로그인
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
