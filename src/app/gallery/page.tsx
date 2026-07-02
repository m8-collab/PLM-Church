import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Pamoja Life Ministry",
  description: "Browse photos from services, events, and ministry moments at Pamoja Life Ministry.",
};

const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    alt: "Congregation raising hands in worship",
    caption: "Worship Together",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    alt: "Friends greeting each other after service",
    caption: "Welcoming Community",
  },
  {
    src: "https://images.unsplash.com/photo-1527250669277-00d28f5d2f54?auto=format&fit=crop&w=900&q=80",
    alt: "People praying together in a circle",
    caption: "Prayer Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    alt: "Volunteers serving food and smiling",
    caption: "Serving Others",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    alt: "Church event decorations and fellowship space",
    caption: "Community Events",
  },
  {
    src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80",
    alt: "Church members holding hands during a prayer service",
    caption: "United in Faith",
  },
];

export default function Gallery() {
  return (
    <div className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
          Photo Gallery
        </p>
        <h1 className="font-display font-bold text-4xl heading-rule text-green mb-4">
          Moments From Our Community
        </h1>
        <p className="font-body text-inkmuted leading-relaxed max-w-2xl mb-12">
          Explore the fellowship, worship, and joyful moments that make Pamoja Life Ministry feel like family.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <article
              key={photo.src}
              className="overflow-hidden rounded-3xl border border-clay bg-white shadow-sm"
            >
              <img
                className="h-72 w-full object-cover"
                src={photo.src}
                alt={photo.alt}
              />
              <div className="p-5">
                <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold mb-2">
                  {photo.caption}
                </p>
                <p className="font-body text-sm text-inkmuted leading-relaxed">
                  {photo.alt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
