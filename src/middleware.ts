export { default } from "next-auth/middleware";
// import withAuth from "next-auth/middleware";
// import { authOptions } from "./app/api/auth/[...nextauth]/authOptions";
export const config = {
  matcher: ["/quiz"],
};

// export default withAuth({
//   jwt: { decode: authOptions.jwt?.decode },
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   },
// });
