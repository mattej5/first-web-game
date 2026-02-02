export type NavLink = {
  href: string;
  label: string;
};

export const NAVIGATION_LINKS: NavLink[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Me" },
  { href: "/blog", label: "Blog" },
  { href: "/history", label: "History" },
  { href: "/vinos", label: "VinOS" },
];
