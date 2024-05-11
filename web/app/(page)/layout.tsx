import SideBar from "@components/common/sidebar";
import InnerHeader from "@components/common/innerheader";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full w-full max-w-full bg-neutral-50">
      <InnerHeader />

      <SideBar />

      <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 lg:ps-64">
        <div className="container mx-auto">{children}</div>
      </div>
    </main>
  );
}
