// import Image from "next/image";
import HeroSection from "@/components/heroSection/heroSection";
import styles from "./page.module.css";
import Footer from "@/components/footer/footer";
// import Header from "@/components/header/header";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <Footer />
      {/* <Footer /> */}
    </div>
  );
}
