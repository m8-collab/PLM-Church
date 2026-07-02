const posts = [
  {
    tag: "Prayer",
    title: "Five Minutes That Can Change Your Whole Day",
    body: "What happens when we begin each morning surrendering just five intentional minutes to God.",
  },
  {
    tag: "Community",
    title: "Why Showing Up for Others Is an Act of Worship",
    body: "Serving your neighbour is not separate from your faith — it may be the fullest expression of it.",
  },
  {
    tag: "Identity",
    title: "You Are Not Who Your Worst Moment Says You Are",
    body: "A reflection on how the gospel redefines shame, failure, and what God calls us by name.",
  },
];

export default function Blog() {
  return (
    <div className="bg-surface px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
          Devotionals &amp; Reflections
        </p>
        <h1 className="font-display font-bold text-4xl heading-rule text-green mb-3">
          Words for the Journey
        </h1>
        <p className="font-body text-inkmuted max-w-md mb-12">
          Short reads to encourage, challenge, and nourish your walk with God through the week.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="bg-cream rounded-lg border border-clay overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="h-28 bg-greenlight flex items-center justify-center">
                <div className="w-full h-full opacity-15 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:16px_16px]" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-wider text-gold mb-1.5">
                  {p.tag}
                </p>
                <h2 className="font-display font-semibold text-green leading-snug mb-2">{p.title}</h2>
                <p className="font-body text-sm text-inkmuted leading-relaxed flex-1">{p.body}</p>
                <span className="font-body text-sm font-bold text-gold mt-4 inline-flex items-center gap-1">
                  Read more →
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="font-body text-xs text-inkmuted/60 mt-12 text-center">
          More reflections coming soon. (These three are placeholders — ask if you'd like a real
          blog wired up to the database, the same way sermons and events are.)
        </p>
      </div>
    </div>
  );
}
