import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import allowedUsers from "./allowedUsers.json";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedUser = allowedUsers.includes(user.email);
      if (isAllowedUser) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
