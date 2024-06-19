"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/sidebar V2/sidebar";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="app-container">
            <Sidebar />
            <main className="content-container">{children}</main>
            {/* <Footer /> */}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

// "use client";
// import { Inter } from "next/font/google";
// import "./globals.css";
// // import Navbar from "@/components/navbar/navbar";
// import { SessionProvider } from "next-auth/react";
// // import Sidebar from "@/components/sidebar/sidebar";
// import Sidebar from "@/components/sidebar V2/sidebar";
// import Footer from "@/components/footer/footer";

// const inter = Inter({ subsets: ["latin"] });

// // export const metadata = {
// //   title: "Bakehila",
// //   description: "",
// // };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SessionProvider>
//           {/* <Navbar /> */}
//           <Sidebar />
//           <main className="content-container">{children}</main>
//           <Footer />
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
