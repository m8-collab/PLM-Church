import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Events() {
  const events = await prisma.event.findMany({
    where: { startTime: { gte: new Date(Date.now() - 86400000) } },
    orderBy: { startTime: "asc" },
  });

  return (
    <div className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
          What's Coming Up
        </p>
        <h1 className="font-display font-bold text-4xl heading-rule text-green mb-3">
          Upcoming Events
        </h1>
        <p className="font-body text-inkmuted max-w-md mb-10">
          From Sunday gatherings to community outreach — there's always something happening at
          Pamoja.
        </p>

        {events.length === 0 && (
          <p className="font-body text-inkmuted">
            Nothing on the calendar right now — check back soon, or see our service times in the footer.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="flex flex-wrap items-center gap-5 bg-surface rounded-lg px-6 py-5 border-l-4 border-gold hover:shadow-md transition-shadow"
            >
              <div className="text-center w-14 shrink-0">
                <div className="font-display font-bold text-2xl text-green leading-none">
                  {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(e.startTime)}
                </div>
                <div className="text-[0.7rem] font-bold uppercase tracking-wider text-gold">
                  {new Intl.DateTimeFormat("en-US", { month: "short" }).format(e.startTime)}
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <h2 className="font-body font-bold text-green text-sm">{e.title}</h2>
                <p className="font-body text-sm text-inkmuted">{e.description}</p>
              </div>
              <div className="font-body text-sm font-bold text-inkmuted ml-auto text-right">
                {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(e.startTime)}
                <br />
                {e.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
