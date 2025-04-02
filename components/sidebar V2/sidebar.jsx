// "use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { links } from "@/data/links";
import { usePathname } from "next/navigation";
import "./sidebar.css";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = session !== null;

  useEffect(() => {
    const container = document.querySelector(".container");

    const handleMouseOver = () => {
      document.body.classList.add("sidebar-open");
    };

    const handleMouseOut = () => {
      document.body.classList.remove("sidebar-open");
    };

    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);

    return () => {
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <nav className="container">
      <div className="logo-div">
        <Link href="/">
          <Image
            className="logo-sidebar"
            src="/SG-logo-modified.png"
            alt="Logo"
            width="40"
            height="40"
          // layout="responsive"
          />
        </Link>
      </div>
      <ul className="link-list">
        {links.map((link) => {
          if (
            (link.showWhenLoggedIn && isLoggedIn) ||
            (link.showWhenLoggedOut && !isLoggedIn) ||
            (!link.showWhenLoggedIn && !link.showWhenLoggedOut)
          ) {
            return (
              <NavItem
                key={nanoid()}
                link={link}
                current={pathname === link.href}
              />
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
}

function NavItem({ link, current }) {
  return (
    <li className="list-item">
      <Link className={`link ${current ? "current" : ""}`} href={link.href}>
        <div className="link-content">
          <div className="link-text">{link.title}</div>
          <div className="link-icon">{link.icon}</div>
        </div>
      </Link>
    </li>
  );
}
