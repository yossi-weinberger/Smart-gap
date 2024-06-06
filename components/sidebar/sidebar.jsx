// "use client";
import Link from "next/link";
import { links } from "@/data/links";
import { usePathname } from "next/navigation";
import "./sidebar.css";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();

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
          <img
            className="logo-sidebar"
            src="/SG-logo-modified.png"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="link-list">
        {links.map((link) => (
          <NavItem
            key={nanoid()}
            link={link}
            current={pathname === link.href}
          />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ link, current }) {
  return (
    <li className="list-item">
      <Link className={`link ${current ? "current" : ""}`} href={link.href}>
        <div className="link-icon">{link.icon}</div>
        <div className="link-text">{link.title}</div>
      </Link>
    </li>
  );
}
