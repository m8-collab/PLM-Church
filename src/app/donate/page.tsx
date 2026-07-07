"use client";

import { useState } from "react";

const funds = ["General", "Missions", "Building"];

export default function Donate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [fund, setFund] = useState("General");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Enter an amount greater than $0.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericAmount, fund, donorName: name, donorEmail: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("Thank you! Your gift has been recorded.");
      setName("");
      setEmail("");
      setAmount("");
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Give</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-4">
        Support the Ministry
      </h1>
      <p className="font-body text-inkmuted mb-8 leading-relaxed">
        Giving keeps Pamoja Hall running, funds our outreach Saturdays, and helps us care for
        our neighbors. Every gift, of any size, matters.
      </p>

      <div className="border border-clay bg-surface rounded-lg p-8 mb-10">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-gold mb-3">How to give</p>
        <p className="font-body text-inkmuted leading-relaxed">
          Send your gift by bank transfer or mobile money using the details below, then fill in
          the short form so we know it's from you and can say thank you.
        </p>
        <ul className="font-body text-inkmuted mt-4 space-y-1 text-sm">
          <li><strong>Bank:</strong> [add your bank name, branch, and account number]</li>
          <li><strong>Mobile money:</strong> [add your paybill/till number or phone number]</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="border border-clay bg-surface rounded-lg p-8 space-y-4">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-gold mb-1">Fund</p>
        <div className="flex gap-2 mb-4 flex-wrap">
          {funds.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFund(f)}
              className={`font-body text-sm px-4 py-2 rounded border transition-colors ${
                fund === f ? "bg-green text-white border-green" : "border-clay text-green hover:border-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none" />
        <input
          required
          type="number"
          min="1"
          placeholder="Amount given (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
        />

        {error && <p className="font-body text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full font-body bg-green text-white font-bold py-3 rounded hover:bg-greenlight transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Record my gift"}
        </button>
        {status && <p className="font-body text-sm text-inkmuted mt-2 text-center">{status}</p>}
      </form>
    </div>
  );
}
