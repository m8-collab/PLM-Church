"use client";

import { useState } from "react";

export default function GalleryAdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "gallery", title, description, imageUrl }),
    });
    if (res.ok) {
      setStatus("Gallery photo added.");
      setTitle("");
      setDescription("");
      setImageUrl("");
    } else {
      setStatus("Could not save the gallery item.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-green mb-4">Add a gallery photo</h1>
      <p className="font-body text-sm text-inkmuted mb-8">Upload a photo URL to appear in the public gallery.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Caption" className="w-full border border-clay rounded px-3 py-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} className="w-full border border-clay rounded px-3 py-2" />
        <input required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="w-full border border-clay rounded px-3 py-2" />
        <button type="submit" className="bg-green text-white px-5 py-2 rounded">Save Photo</button>
      </form>
      {status && <p className="font-body text-sm text-inkmuted mt-4">{status}</p>}
    </div>
  );
}
