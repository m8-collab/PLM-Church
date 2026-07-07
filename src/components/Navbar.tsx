"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/ministries", label: "Ministries" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-green shadow-lg px-4 sm:px-8 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-sm">
          <Image src="/logo.png" alt="Pamoja Life Ministry logo" fill className="object-contain" priority />
        </div>
      </Link>

      <ul className="hidden md:flex items-center font-body">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-clay text-[0.82rem] font-bold uppercase tracking-wider px-4 h-16 flex items-center border-b-[3px] border-transparent hover:text-white hover:border-gold transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/login"
            className="text-clay text-[0.82rem] font-bold uppercase tracking-wider px-4 h-16 flex items-center border-b-[3px] border-transparent hover:text-white hover:border-gold transition-colors"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/donate"
            className="ml-2 bg-gold text-green rounded font-bold text-[0.82rem] uppercase tracking-wider px-5 py-2 hover:bg-goldlight transition-colors"
          >
            Give
          </Link>
        </li>
      </ul>

      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col gap-[5px] p-2"
      >
        <span className="block w-[22px] h-[2px] bg-clay" />
        <span className="block w-[22px] h-[2px] bg-clay" />
        <span className="block w-[22px] h-[2px] bg-clay" />
      </button>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-green flex flex-col py-2 z-50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-clay text-sm font-bold uppercase tracking-wider px-8 py-3 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-clay text-sm font-bold uppercase tracking-wider px-8 py-3 hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="mx-8 mt-2 text-center bg-gold text-green rounded font-bold text-sm uppercase tracking-wider px-5 py-2"
          >
            Give
          </Link>
        </div>
      )}
    </nav>
  );
}
