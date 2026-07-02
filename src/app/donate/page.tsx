"use client";

import { useState } from "react";

const presetAmounts = [25, 50, 100, 250];
const funds = ["General", "Missions", "Building"];

export default function Donate() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState("General");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGive() {
    setError("");
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) {
      setError("Enter an amount greater than $0.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, fund }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Give</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-4">
        Support the Ministry
      </h1>
      <p className="font-body text-inkmuted mb-10 leading-relaxed">
        Giving keeps Pamoja Hall running, funds our outreach Saturdays, and helps us care for
        our neighbors. Every gift, of any size, matters. Payments are processed securely by
        Stripe.
      </p>

      <div className="border border-clay bg-surface rounded-lg p-8">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-gold mb-3">Fund</p>
        <div className="flex gap-2 mb-8 flex-wrap">
          {funds.map((f) => (
            <button
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

        <p className="font-body text-xs font-bold uppercase tracking-wide text-gold mb-3">Amount (USD)</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {presetAmounts.map((a) => (
            <button
              key={a}
              onClick={() => {
                setAmount(a);
                setCustomAmount("");
              }}
              className={`font-body py-3 rounded border transition-colors ${
                amount === a && !customAmount
                  ? "bg-green text-white border-green"
                  : "border-clay text-green hover:border-gold"
              }`}
            >
              ${a}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-full border border-clay rounded px-4 py-3 font-body bg-white focus:border-green outline-none"
        />

        {error && <p className="font-body text-sm text-red-700 mt-4">{error}</p>}

        <button
          onClick={handleGive}
          disabled={loading}
          className="w-full mt-6 font-body bg-green text-white font-bold py-3 rounded hover:bg-greenlight transition-colors disabled:opacity-50"
        >
          {loading ? "Redirecting to checkout…" : "Continue to secure checkout"}
        </button>
        <p className="font-body text-xs text-inkmuted/60 mt-3 text-center">
          You'll finish your gift on Stripe's secure payment page.
        </p>
      </div>
    </div>
  );
}
