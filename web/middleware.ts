export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analyze/:path*",
    "/generate/:path*",
    "/apply/:path*",
  ],
};
