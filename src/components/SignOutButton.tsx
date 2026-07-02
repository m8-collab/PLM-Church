"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-body border border-clay text-green px-5 py-2 rounded hover:border-gold hover:text-gold transition-colors"
    >
      Log out
    </button>
  );
}
