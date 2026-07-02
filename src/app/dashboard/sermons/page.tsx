"use client";

import { useState } from "react";

export default function SermonsAdminPage() {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");
  const [summary, setSummary] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/sermons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, speaker, series, summary, videoUrl }),
    });
    if (res.ok) {
      setStatus("Sermon saved.");
      setTitle("");
      setSpeaker("");
      setSeries("");
      setSummary("");
      setVideoUrl("");
    } else {
      setStatus("Could not save the sermon.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-green mb-4">Manage sermons</h1>
      <p className="font-body text-sm text-inkmuted mb-8">Add a sermon title, speaker, and video link.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-clay rounded px-3 py-2" />
        <input required value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder="Speaker" className="w-full border border-clay rounded px-3 py-2" />
        <input value={series} onChange={(e) => setSeries(e.target.value)} placeholder="Series" className="w-full border border-clay rounded px-3 py-2" />
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" rows={4} className="w-full border border-clay rounded px-3 py-2" />
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL" className="w-full border border-clay rounded px-3 py-2" />
        <button type="submit" className="bg-green text-white px-5 py-2 rounded">Save Sermon</button>
      </form>
      {status && <p className="font-body text-sm text-inkmuted mt-4">{status}</p>}
    </div>
  );
}
