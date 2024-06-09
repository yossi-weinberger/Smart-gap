// // components/Header.js
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import styles from "./Header.module.css";

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       setIsScrolled(scrollTop > 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <header
//       className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
//       // style={{ backgroundColor: "#dbd5e6" }}
//     >
//       <div className={styles.logoContainer}>
//         <Image
//           src="/sg-logo.svg"
//           alt="Logo"
//           width={isScrolled ? 70 : 120} // גודל הלוגו כאשר לא בגלילה
//           height={isScrolled ? 70 : 120} // גודל הלוגו כאשר בגלילה
//           className={styles.logo}
//         />
//       </div>
//     </header>
//   );
// };

// export default Header;
