"use client";

import { useState } from "react";

const reasons = ["Plan a visit", "Learn about a ministry", "Ask a question", "Request prayer", "Something else"];

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", reason: reasons[0], message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          reason: form.reason,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", reason: reasons[0], message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
          Come Find Us
        </p>
        <h1 className="font-display font-bold text-4xl heading-rule text-green mb-3">
          We'd Love to Meet You
        </h1>
        <p className="font-body text-inkmuted max-w-lg mb-12">
          Whether you're just curious or ready to call this home — our door is always open.
          Reach out anytime.
        </p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-14">
          <div className="flex flex-col gap-7">
            {[
              { label: "Location", value: "Pamoja Hall, Along Kilifi-Mombasa Road\nMtwapa, Kenya" },
              { label: "Service Times", value: "Sundays: 10:00 AM & 12:30 PM\nMidweek: Thursday 5:30 PM" },
              { label: "Phone", value: "+254 715 303 539" },
              { label: "Email", value: "hello@pamojalifeministy.org" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-surface border border-clay flex items-center justify-center shrink-0">
                  <span className="text-gold text-sm">●</span>
                </div>
                <div>
                  <h3 className="font-body text-xs font-bold uppercase tracking-wider text-gold mb-0.5">
                    {item.label}
                  </h3>
                  <p className="font-body text-sm text-inkmuted whitespace-pre-line leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            {status === "sent" ? (
              <p className="font-body text-inkmuted border border-clay bg-surface rounded-lg p-6">
                Message sent — someone from our team will reply within a couple of days.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs font-bold text-inkmuted">First name</label>
                    <input
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Grace"
                      className="border border-clay rounded px-3.5 py-2.5 font-body text-sm bg-white focus:border-green outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs font-bold text-inkmuted">Last name</label>
                    <input
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Kamau"
                      className="border border-clay rounded px-3.5 py-2.5 font-body text-sm bg-white focus:border-green outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-bold text-inkmuted">Email address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="grace@example.com"
                    className="border border-clay rounded px-3.5 py-2.5 font-body text-sm bg-white focus:border-green outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-bold text-inkmuted">I'd like to...</label>
                  <select
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className="border border-clay rounded px-3.5 py-2.5 font-body text-sm bg-white focus:border-green outline-none"
                  >
                    {reasons.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-bold text-inkmuted">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us a little about yourself or what's on your heart..."
                    className="border border-clay rounded px-3.5 py-2.5 font-body text-sm bg-white focus:border-green outline-none resize-vertical"
                  />
                </div>
                {status === "error" && (
                  <p className="font-body text-sm text-red-700">
                    Something went wrong sending your message. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-green text-white font-body font-bold text-sm tracking-wide py-3 rounded hover:bg-greenlight transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
