export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/create/:path*", "/analyze/:path*"],
};
