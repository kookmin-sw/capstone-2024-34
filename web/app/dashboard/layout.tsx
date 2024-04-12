import SideBar from "@components/common/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SideBar />
      {children}
    </main>
  );
}
