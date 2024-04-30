import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-8 text-2xl font-semibold">
        Infosec Platform Test Landing Page
      </h1>

      <Link
        type="button"
        className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 "
        href={"/dashboard"}
      >
        대시보드 바로가기
      </Link>
    </main>
  );
}
