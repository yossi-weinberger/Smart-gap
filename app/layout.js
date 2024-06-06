"use client";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/navbar/navbar";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Bakehila",
//   description: "",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {/* <Navbar /> */}
          <Sidebar />
          <main className="content-container">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
