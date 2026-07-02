import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Sermons() {
  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="bg-surface px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
          Recent Messages
        </p>
        <h1 className="font-display font-bold text-4xl heading-rule text-green mb-3">
          Sermons to Feed Your Soul
        </h1>
        <p className="font-body text-inkmuted max-w-md mb-10">
          Catch up on our latest messages or browse our full library. There's a word for every
          season of life.
        </p>

        {sermons.length === 0 && (
          <p className="font-body text-inkmuted">No sermons posted yet — check back soon.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((s) => {
            const initials = s.speaker.split(" ").map((w) => w[0]).slice(0, 2).join("");
            return (
              <div
                key={s.id}
                className="bg-cream rounded-lg border border-clay overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="bg-green h-36 flex items-center justify-center relative">
                  {s.series && (
                    <span className="absolute top-2.5 left-3 text-[0.65rem] font-bold uppercase tracking-wider text-clay bg-white/10 px-2 py-1 rounded-full">
                      {s.series}
                    </span>
                  )}
                  {s.videoUrl ? (
                    <a
                      href={s.videoUrl}
                      className="w-[52px] h-[52px] rounded-full bg-gold/90 flex items-center justify-center hover:bg-gold hover:scale-105 transition-all"
                      aria-label={`Watch ${s.title}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                    </a>
                  ) : (
                    <div className="w-[52px] h-[52px] rounded-full bg-gold/40 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-body text-[0.72rem] text-gold font-bold mb-1">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(s.date)}
                  </p>
                  <h2 className="font-display font-semibold text-green leading-snug mb-1.5">{s.title}</h2>
                  <p className="font-body text-sm text-inkmuted leading-relaxed">{s.summary}</p>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-clay">
                    <div className="w-[30px] h-[30px] rounded-full bg-green flex items-center justify-center font-display text-gold text-xs font-bold">
                      {initials}
                    </div>
                    <span className="font-body text-[0.78rem] text-inkmuted">{s.speaker}</span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    {s.audioUrl && (
                      <a href={s.audioUrl} className="font-body text-sm font-bold text-gold hover:text-green">
                        Listen →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
