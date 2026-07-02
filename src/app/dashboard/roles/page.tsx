"use client";

import { useState } from "react";

export default function RolesPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Updating role...");
    const res = await fetch("/api/admin/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role: "admin" }),
    });

    if (res.ok) {
      setStatus(`Role updated for ${email}.`);
      setEmail("");
    } else {
      setStatus("Could not update the role.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-green mb-4">Manage admin roles</h1>
      <p className="font-body text-sm text-inkmuted mb-8">Promote an existing member to admin so they can manage content and requests.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Member email" className="w-full border border-clay rounded px-3 py-2" />
        <button type="submit" className="bg-green text-white px-5 py-2 rounded">Promote to Admin</button>
      </form>
      {status && <p className="font-body text-sm text-inkmuted mt-4">{status}</p>}
    </div>
  );
}
