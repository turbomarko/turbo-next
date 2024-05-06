import { LinkType } from "./types";

export const links: LinkType[][] = [
  [
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Privacy Policy",
      href: "/docs/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      href: "/docs/terms-and-conditions",
    },
  ],
  [
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Sign up",
      href: "/",
      isAuth: true,
    },
    {
      name: "Log in",
      href: "/",
      isAuth: true,
    },
  ],
];
