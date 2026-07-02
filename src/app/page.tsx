import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [sermons, events] = await Promise.all([
    prisma.sermon.findMany({ orderBy: { date: "desc" }, take: 3 }),
    prisma.event.findMany({
      where: { startTime: { gte: new Date(Date.now() - 86400000) } },
      orderBy: { startTime: "asc" },
      take: 4,
    }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-green min-h-[92vh] flex items-center justify-center text-center px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.04]" aria-hidden="true" />
        <svg
          className="absolute opacity-[0.06] right-[5%] top-1/2 -translate-y-1/2 hidden md:block"
          width="280" height="340" viewBox="0 0 340 420" fill="none" aria-hidden="true"
        >
          <rect x="140" y="20" width="60" height="380" rx="8" fill="white" />
          <rect x="20" y="140" width="300" height="60" rx="8" fill="white" />
        </svg>

        <div className="relative max-w-2xl">
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-5">
            Welcome to
          </p>
          <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,5rem)] leading-[1.1] text-white mb-3">
            Pamoja <em className="italic text-goldlight">Life</em>
            <br />
            Ministry
          </h1>
          <p className="font-body text-lg font-light text-clay mt-5 mb-10 max-w-md mx-auto">
            A community where we live, love, serve and share to be more like Christ Jesus.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/about"
              className="bg-gold text-green font-bold text-sm tracking-wide px-8 py-3 rounded hover:bg-goldlight transition-colors"
            >
              Discover Our Family
            </Link>
            <Link
              href="/sermons"
              className="border-2 border-white/35 text-white font-bold text-sm tracking-wide px-8 py-3 rounded hover:border-white hover:bg-white/[0.08] transition-colors"
            >
              Watch Sermons
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-clay text-[0.7rem] uppercase tracking-[0.12em] opacity-60">
          <div className="w-px h-10 bg-clay scroll-pulse" />
          Scroll
        </div>
      </section>
      <div className="h-1.5 bg-gradient-to-r from-green via-gold to-green" />

      {/* ABOUT PREVIEW */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-green rounded-lg aspect-[4/3] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 dot-pattern opacity-[0.06]" aria-hidden="true" />
            <div className="relative text-center text-white px-8">
              <p className="font-display italic text-2xl text-clay leading-relaxed">
                "Let your light shine before others, that they may see your good deeds and glorify your Father in Heaven."
              </p>
              <cite className="block not-italic text-xs tracking-widest text-gold mt-3">
                — Matthew 5:16
              </cite>
            </div>
          </div>
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
              Who We Are
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl heading-rule text-green mb-4 leading-tight">
              A Place to Belong, a Family to Grow In
            </h2>
            <p className="font-body text-inkmuted leading-relaxed mb-6 max-w-md">
              Pamoja — Swahili for "together" — is the heartbeat of everything we do. We're a
              vibrant, multi-generational church community built on the conviction that life
              is better lived together.
            </p>
            <Link href="/about" className="font-body text-gold font-bold text-sm hover:text-green">
              Read our full story →
            </Link>
          </div>
        </div>
      </section>

      {/* SERMONS PREVIEW */}
      <section className="bg-surface px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
            Recent Messages
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl heading-rule text-green mb-10">
            Sermons to Feed Your Soul
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((s) => (
              <div key={s.id} className="bg-cream rounded-lg border border-clay overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="bg-green h-32 flex items-center justify-center relative">
                  {s.series && (
                    <span className="absolute top-2.5 left-3 text-[0.65rem] font-bold uppercase tracking-wider text-clay bg-white/10 px-2 py-1 rounded-full">
                      {s.series}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-body text-[0.72rem] text-gold font-bold mb-1">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(s.date)}
                  </p>
                  <h3 className="font-display font-semibold text-green leading-snug mb-1.5">{s.title}</h3>
                  <p className="font-body text-sm text-inkmuted leading-relaxed">{s.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sermons" className="inline-block bg-gold text-green font-bold text-sm tracking-wide px-8 py-3 rounded hover:bg-goldlight transition-colors">
              Browse All Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
            What's Coming Up
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl heading-rule text-green mb-10">
            Upcoming Events
          </h2>
          <div className="flex flex-col gap-3">
            {events.map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-5 bg-surface rounded-lg px-6 py-5 border-l-4 border-gold">
                <div className="text-center w-14 shrink-0">
                  <div className="font-display font-bold text-2xl text-green leading-none">
                    {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(e.startTime)}
                  </div>
                  <div className="text-[0.7rem] font-bold uppercase tracking-wider text-gold">
                    {new Intl.DateTimeFormat("en-US", { month: "short" }).format(e.startTime)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-bold text-green text-sm">{e.title}</h3>
                  <p className="font-body text-sm text-inkmuted">{e.location}</p>
                </div>
                <div className="font-body text-sm font-bold text-inkmuted ml-auto text-right">
                  {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(e.startTime)}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events" className="font-body text-gold font-bold text-sm hover:text-green">
              See all events →
            </Link>
          </div>
        </div>
      </section>

      {/* MINISTRIES + GIVE CTA */}
      <section className="bg-green px-6 py-20 text-center">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Get Involved</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-clay mb-4">Find Your Place at the Table</h2>
        <p className="font-body text-clay/75 max-w-md mx-auto mb-8">
          From ministries to missions to giving — there are many ways to belong here.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/ministries" className="bg-gold text-green font-bold text-sm tracking-wide px-8 py-3 rounded hover:bg-goldlight transition-colors">
            Explore Ministries
          </Link>
          <Link href="/donate" className="border-2 border-white/35 text-white font-bold text-sm tracking-wide px-8 py-3 rounded hover:border-white hover:bg-white/[0.08] transition-colors">
            Give Online
          </Link>
        </div>
      </section>
    </>
  );
}
