import SideBar from "@components/common/sidebar";
import Link from "next/link";
import Image from "next/image";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full w-full max-w-full bg-neutral-50">
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
                    className="inline-block size-[38px] rounded-full ring-2 ring-white"
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
                    <p className="text-sm text-gray-500">사용자</p>
                    <p className="text-sm font-medium text-gray-800">
                      test@kookmin.ac.kr
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                      href="#"
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
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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

      <SideBar />

      <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 lg:ps-64">
        <div className="container mx-auto">{children}</div>
      </div>
    </main>
  );
}
