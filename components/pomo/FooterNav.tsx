"use client";

import Link from "next/link";
import { JSX, Suspense } from "react";
import { HiHome } from "react-icons/hi";
import { motion } from "framer-motion";
import ScrollDownLink from "./ScrollDownLink";
import { useTheme } from "@/contexts/ThemeContext";

const FooterNav = () => {
  const { theme } = useTheme();

  type NavType = {
    href: string;
    label?: string;
    icon?: JSX.Element;
  };
  type NavsType = NavType[];

  const links: NavsType = [
    {
      href: "/",
      label: "Home",
      icon: <HiHome />,
    },
  ];

  return (
    <motion.nav
      whileHover={{ scale: 1.05 }}
      className={`w-fit h-fit ${theme.buttonBg} bg-opacity-80 rounded-lg py-1 px-2 backdrop-blur-sm transition-colors duration-300`}
    >
      <ul
        className={`flex items-center gap-x-2 text-base ${theme.textSecondary}`}
      >
        {links.map(({ href, label, icon }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {icon && icon}
              {label && label}
              <span className={theme.textSecondary}>|</span>
            </Link>
          </li>
        ))}

        <Suspense>
          <ScrollDownLink />
        </Suspense>
      </ul>
    </motion.nav>
  );
};

export default FooterNav;
