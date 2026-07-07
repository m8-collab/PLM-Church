"use client";

import { useState } from "react";

export default function SermonsAdminPage() {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");
  const [summary, setSummary] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let finalVideoUrl = videoUrl;

    if (videoFile) {
      setStatus("Uploading video... this can take a moment for longer files.");
      const uploadForm = new FormData();
      uploadForm.append("file", videoFile);
      uploadForm.append("bucket", "sermon-videos");

      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        setStatus(uploadData.error ?? "Could not upload the video.");
        return;
      }
      finalVideoUrl = uploadData.url;
    }

    setStatus("Saving...");
    const res = await fetch("/api/sermons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, speaker, series, summary, videoUrl: finalVideoUrl }),
    });

    if (res.ok) {
      setStatus("Sermon saved.");
      setTitle("");
      setSpeaker("");
      setSeries("");
      setSummary("");
      setVideoUrl("");
      setVideoFile(null);
      const input = document.getElementById("video-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } else {
      setStatus("Could not save the sermon.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-green mb-4">Manage sermons</h1>
      <p className="font-body text-sm text-inkmuted mb-8">
        Add a sermon title, speaker, and video — either upload a file directly (best for short
        clips) or paste a link such as a YouTube URL (best for full-length services, since it
        won't use your storage space).
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-clay rounded px-3 py-2" />
        <input required value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder="Speaker" className="w-full border border-clay rounded px-3 py-2" />
        <input value={series} onChange={(e) => setSeries(e.target.value)} placeholder="Series" className="w-full border border-clay rounded px-3 py-2" />
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" rows={4} className="w-full border border-clay rounded px-3 py-2" />

        <div className="border border-clay rounded p-4 space-y-3">
          <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">Video</p>
          <input
            id="video-input"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            className="w-full border border-clay rounded px-3 py-2 bg-white"
          />
          <p className="font-body text-xs text-inkmuted text-center">— or —</p>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste a video URL (e.g. YouTube link)"
            className="w-full border border-clay rounded px-3 py-2"
          />
        </div>

        <button type="submit" className="bg-green text-white px-5 py-2 rounded">Save Sermon</button>
      </form>
      {status && <p className="font-body text-sm text-inkmuted mt-4">{status}</p>}
    </div>
  );
}
