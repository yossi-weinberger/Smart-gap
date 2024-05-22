"use client";
import Link from "next/link";
import { links } from "@/data/links";
import { usePathname } from "next/navigation";
import "./navbar.css";
import { nanoid } from "nanoid";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="container">
      <ul className="link-list">
        {links.map((link) => (
          <NavItem
            key={nanoid()}
            link={link}
            current={pathname === link.href}
          />
        ))}
      </ul>
      {/* {token ? (
        <button onClick={() => setToken(null)}>SignOut</button>
      ) : (
        <div className="row">
          <button onClick={() => setOpenRegister(true)} variant="outlined">
            Register
          </button>
          <Button onClick={() => setOpenLogin(true)} variant="outlined">
            Login
          </Button>
        </div>
      )} */}
      {/* {openLogin && <LoginModal setOpen={setOpenLogin} />}
      {openRegister && <RegistrationModal setOpen={setOpenRegister} />} */}
    </nav>
  );
}

function NavItem({ link, current }) {
  return (
    <li className="list-item">
      {/* {!link.excluded && ( */}
      <Link className={`link ${current && "current"}`} href={link.href}>
        {link.title}
      </Link>
      {/* )} */}
    </li>
  );
}
