import "./links.css";

const HomeIcon = () => (
  <img src="/icons/home.svg" alt="Home" className="icon" />
);
const DashboardIcon = () => (
  <img src="/icons/pie.svg" alt="Dashboard" className="icon" />
);
const InfoIcon = () => (
  <img src="/icons/info.svg" alt="About" className="icon" />
);
const ContactIcon = () => (
  <img src="/icons/mail.svg" alt="Contact" className="icon" />
);

export const links = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  // {
  //   title: "FrameworksId",
  //   href: "/frameworksId",
  //   excluded: true,
  // },
  {
    title: "About",
    href: "/about",
    icon: <InfoIcon />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <ContactIcon />,
  },
  // {
  //   title: "New product",
  //   href: "/new-category",
  // },
  // {
  //   title: "Speakers",
  //   href: "/product/:id",
  //   excluded: true,
  // },
];
