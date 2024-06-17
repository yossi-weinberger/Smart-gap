import "./links.css";

const HomeIcon = () => (
  <img src="/icons/home.svg" alt="Home" className="icon" />
);
const DashboardIcon = () => (
  <img src="/icons/graphs.svg" alt="Dashboard" className="icon" />
);
const InfoIcon = () => (
  <img src="/icons/info.svg" alt="About" className="icon" />
);
const ContactIcon = () => (
  <img src="/icons/about.svg" alt="Contact" className="icon" />
);
const LoginIcon = () => (
  <img src="/icons/logout.svg" alt="Contact" className="icon" />
);
const LogoutIcon = () => (
  <img src="/icons/logout.svg" alt="Contact" className="icon" />
);
const DataIcon = () => (
  <img src="/icons/data.svg" alt="Contact" className="icon" />
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
