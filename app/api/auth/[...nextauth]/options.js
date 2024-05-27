import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const options: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     //   CredentialsProvider({
//     //       name: "Credentials",
//     //       credentials: {
//     //         username: { label: "Username", type: "text", placeholder: "Username" },
//     //         password: { label: "Password", type: "password" },
//     //       },
//     //       async authorize(credentials: any) {
//     //         if (
//     //           credentials.username === process.env.ADMIN_USERNAME &&
//     //           credentials.password ===  process.env.ADMIN_PASSWORD
//     //         ) {
//     //           return { name: credentials.username };
//     //         } else {
//     //           return null;
//     //         }
//     //       },
//     //     })
//   ],
// };

import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "Username" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (
    //       credentials.username === process.env.ADMIN_USERNAME &&
    //       credentials.password === process.env.ADMIN_PASSWORD
    //     ) {
    //       return { name: credentials.username };
    //     } else {
    //       return null;
    //     }
    //   },
    // })
  ],
};
