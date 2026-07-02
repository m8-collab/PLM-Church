"use client";

import { useState } from "react";

export default function BlogAdminPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "blog", title, excerpt, content }),
    });
    if (res.ok) {
      setStatus("Blog post saved.");
      setTitle("");
      setExcerpt("");
      setContent("");
    } else {
      setStatus("Could not save the blog post.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-green mb-4">Create a blog post</h1>
      <p className="font-body text-sm text-inkmuted mb-8">Publish updates, reflections, and ministry news.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-clay rounded px-3 py-2" />
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary" rows={3} className="w-full border border-clay rounded px-3 py-2" />
        <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post here..." rows={10} className="w-full border border-clay rounded px-3 py-2" />
        <button type="submit" className="bg-green text-white px-5 py-2 rounded">Save Post</button>
      </form>
      {status && <p className="font-body text-sm text-inkmuted mt-4">{status}</p>}
    </div>
  );
}
