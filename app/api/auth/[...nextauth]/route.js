import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import allowedUsers from "./allowedUsers.json";

const options = {
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth({
  ...options,

  // only allow authenticated users from the list
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     const isAllowedUser = allowedUsers.includes(user.email);
  //     if (isAllowedUser) {
  //       return true;
  //     }
  //   },
  // },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
