import Link from "next/link";

export default function SideBar() {
  return (
    <div
      id="application-sidebar"
      className="hs-overlay fixed inset-y-0 start-0 z-[60] hidden w-64 -translate-x-full transform border-e border-gray-700 bg-gray-900 transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
    >
      <div className="px-6 pt-4">
        <Link
          className="flex-none text-xl font-bold text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
          href="/dashboard"
          aria-label="Brand"
        >
          Platform GIPS
        </Link>
        <p className="text-white">생성형 침입방지 보안 플랫폼</p>
      </div>

      <nav
        className="hs-accordion-group flex w-full flex-col flex-wrap p-6"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <li>
            <Link
              className="flex items-center gap-x-3 rounded-lg bg-gray-700 px-2.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
              href="/dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              대시보드
            </Link>
          </li>

          <li className="hs-accordion" id="users-accordion">
            <button
              type="button"
              className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
              탐지규칙 생성
              <svg
                className="ms-auto hidden size-4 hs-accordion-active:block"
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
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="ms-auto block size-4 hs-accordion-active:hidden"
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              id="users-accordion-child"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            >
              <ul className="ps-2 pt-2">
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                    href="/create/yararule"
                  >
                    Yara rule 생성
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="hs-accordion" id="account-accordion">
            <button
              type="button"
              className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
              탐지통계 조회
              <svg
                className="ms-auto hidden size-4 hs-accordion-active:block"
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
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="ms-auto block size-4 hs-accordion-active:hidden"
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              id="account-accordion-child"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            >
              <ul className="ps-2 pt-2">
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                    href="/stats/chart"
                  >
                    통계 시각화
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="hs-accordion" id="analyze-accordion">
            <button
              type="button"
              className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              파일 분석
              <svg
                className="ms-auto hidden size-4 hs-accordion-active:block"
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
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="ms-auto block size-4 hs-accordion-active:hidden"
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              id="analyze-accordion-child"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            >
              <ul className="ps-2 pt-2">
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                    href="/analyze/file/pe"
                  >
                    단일 PE 파일 분석
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                    href="/analyze/files/pe"
                  >
                    복수 PE 파일 분석
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a
              className="hover:text-white-300 flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              환경설정
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
