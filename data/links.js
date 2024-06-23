import Image from "next/image";
import "./links.css";

const HomeIcon = () => (
  <Image
    src="/icons/home.svg"
    alt="Home"
    width={24}
    height={24}
    className="icon"
  />
);

const DashboardIcon = () => (
  <Image
    src="/icons/graphs.svg"
    alt="Dashboard"
    width={24}
    height={24}
    className="icon"
  />
);

const DataIcon = () => (
  <Image
    src="/icons/table.svg"
    alt="Data"
    width={24}
    height={24}
    className="icon"
  />
);

const InfoIcon = () => (
  <Image
    src="/icons/info.svg"
    alt="About"
    width={24}
    height={24}
    className="icon"
  />
);

const ContactIcon = () => (
  <Image
    src="/icons/contact.svg"
    alt="Contact"
    width={24}
    height={24}
    className="icon"
  />
);

const LoginIcon = () => (
  <Image
    src="/icons/login.svg"
    alt="Login"
    width={24}
    height={24}
    className="icon"
  />
);

const LogoutIcon = () => (
  <Image
    src="/icons/logout.svg"
    alt="Logout"
    width={24}
    height={24}
    className="icon"
  />
);

export const links = [
  {
    title: "בית",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    title: "דשבורד",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "נתונים",
    href: "/data",
    icon: <DataIcon />,
  },
  {
    title: "אודות",
    href: "/about",
    icon: <InfoIcon />,
  },
  {
    title: "צור קשר",
    href: "/contact",
    icon: <ContactIcon />,
  },
  {
    title: "התחברות",
    href: "/auth/login",
    icon: <LoginIcon />,
    showWhenLoggedOut: true,
  },
  {
    title: "התנתקות",
    href: "/auth/login",
    icon: <LogoutIcon />,
    showWhenLoggedIn: true,
  },
];
