"use client";

import { useState } from "react";

export default function GalleryAdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setStatus("Choose a photo to upload.");
      return;
    }

    setStatus("Uploading photo...");
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("bucket", "gallery-photos");

    const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
      setStatus(uploadData.error ?? "Could not upload the photo.");
      return;
    }

    setStatus("Saving...");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "gallery", title, description, imageUrl: uploadData.url }),
    });

    if (res.ok) {
      setStatus("Gallery photo added.");
      setTitle("");
      setDescription("");
      setFile(null);
      const input = document.getElementById("photo-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } else {
      setStatus("Could not save the gallery item.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-green mb-4">Add a gallery photo</h1>
      <p className="font-body text-sm text-inkmuted mb-8">
        Choose a photo from your computer. It's uploaded to Supabase Storage and the link is
        saved automatically — no need to host it anywhere yourself.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Caption" className="w-full border border-clay rounded px-3 py-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} className="w-full border border-clay rounded px-3 py-2" />
        <input
          id="photo-input"
          required
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full border border-clay rounded px-3 py-2 bg-white"
        />
        <button type="submit" className="bg-green text-white px-5 py-2 rounded">Save Photo</button>
      </form>
      {status && <p className="font-body text-sm text-inkmuted mt-4">{status}</p>}
    </div>
  );
}
