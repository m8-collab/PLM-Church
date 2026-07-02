const ministries = [
  { title: "Men's Fellowship", body: "Iron sharpening iron — men growing in faith, family, and purpose together." },
  { title: "Women of Grace", body: "A sisterhood built on prayer, encouragement, and walking each other through life." },
  { title: "Youth & Young Adults", body: "A bold generation discovering identity and calling in the kingdom of God." },
  { title: "Missions & Outreach", body: "Taking the love of God beyond our walls — locally, nationally, and globally." },
  { title: "Worship Team", body: "Creating a sound that ushers hearts into God's presence every Sunday." },
  { title: "Children's Ministry", body: "Raising the next generation with fun, faith-filled environments they love." },
];

export default function Ministries() {
  return (
    <div className="bg-green px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">
          Get Involved
        </p>
        <h1 className="font-display font-bold text-4xl text-clay mb-3">Our Ministries</h1>
        <p className="font-body text-clay/75 max-w-md mb-12">
          Every person has a place here. Find the ministry where your gifts and God's purpose
          intersect.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <div
              key={m.title}
              className="bg-white/[0.06] border border-white/10 rounded-lg p-7 text-center hover:bg-white/10 hover:-translate-y-1 transition-all"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-gold text-lg">✦</span>
              </div>
              <h2 className="font-display font-semibold text-white mb-2">{m.title}</h2>
              <p className="font-body text-sm text-clay leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
