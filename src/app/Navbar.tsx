"use client";

import { Box } from "@radix-ui/themes";
import cn from "mxcn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-14 items-center space-x-6">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={cn(
                "hover:text-zinc-800 transition-colors text-zinc-500",
                pathname === link.href && "text-zinc-900"
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
      </Box>
    </nav>
  );
}
