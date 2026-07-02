"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Incorrect email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Member Area</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-10">Log in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-bold text-inkmuted">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-bold text-inkmuted">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
          />
        </div>
        {error && <p className="font-body text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green text-white font-body font-bold py-3 rounded hover:bg-greenlight transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="font-body text-sm text-inkmuted mt-6 text-center">
        New here?{" "}
        <Link href="/register" className="text-gold font-bold hover:text-green">
          Create an account
        </Link>
      </p>
      <p className="font-body text-xs text-inkmuted/50 mt-4 text-center">
        Demo login (after seeding): grace@example.org / password123
      </p>
    </div>
  );
}
