"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error?.formErrors?.[0] ?? data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Member Area</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-10">Create an account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-bold text-inkmuted">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-bold text-inkmuted">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-bold text-inkmuted">Password</label>
          <input
            required
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
          />
        </div>
        {error && <p className="font-body text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green text-white font-body font-bold py-3 rounded hover:bg-greenlight transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="font-body text-sm text-inkmuted mt-6 text-center">
        Already a member?{" "}
        <Link href="/login" className="text-gold font-bold hover:text-green">
          Log in
        </Link>
      </p>
    </div>
  );
}
