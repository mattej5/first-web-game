import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaCode,
  FaFolderOpen,
  FaGamepad,
  FaHistory,
  FaHome,
  FaUser,
} from "react-icons/fa";

export type NavLink = {
  href: string;
  label: string;
  icon: IconType;
  includeInMobile?: boolean;
};

export const NAVIGATION_LINKS: NavLink[] = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/projects", label: "Projects", icon: FaFolderOpen },
  { href: "/about", label: "About", icon: FaUser },
  { href: "/blog", label: "Blog", icon: FaBookOpen },
  { href: "/history", label: "History", icon: FaHistory },
  {
    href: "/game",
    label: "Battle Arena",
    icon: FaGamepad,
    includeInMobile: false,
  },
  { href: "/vinos", label: "VinOS", icon: FaCode },
];
