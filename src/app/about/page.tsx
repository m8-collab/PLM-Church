const values = [
  { title: "Authentic Worship", body: "We come as we are, and encounter a God who transforms us in His presence." },
  { title: "Rooted in Scripture", body: "Every message, ministry, and decision is anchored in the living Word of God." },
  { title: "Community First", body: "We do life together — from joyful celebrations to carrying each other's burdens." },
  { title: "Serving the World", body: "Faith without works is empty. We actively serve our city and beyond." },
];

const leaders = [
  { name: "Pastor Lyanne Njoroge", role: "Lead Pastor", bio: "Lyanne has led Pamoja Life Ministry since its founding and teaches most Sundays." },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-3">Who We Are</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-8">
        A Place to Belong, a Family to Grow In
      </h1>

      <p className="font-body text-inkmuted leading-relaxed">
        Founded on the conviction that life is better together, Pamoja Life Ministry is a
        vibrant, multi-generational church community in Mtwapa, Kenya. Pamoja — Swahili for
        "together" — is the heartbeat of everything we do, from how we worship to how we
        care for our neighbors.
      </p>

      <h2 className="font-display font-bold text-2xl text-green mt-12 mb-6">What we believe</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {values.map((v) => (
          <div key={v.title} className="flex gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gold mt-1.5 shrink-0" />
            <div>
              <h3 className="font-body font-bold text-green text-sm">{v.title}</h3>
              <p className="font-body text-sm text-inkmuted mt-1">{v.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display font-bold text-2xl text-green mt-12 mb-6">Pastoral team</h2>
      <div className="grid sm:grid-cols-2 gap-8">
        {leaders.map((l) => (
          <div key={l.name}>
            <p className="font-display text-lg text-green">{l.name}</p>
            <p className="font-body text-xs uppercase tracking-wide text-gold mt-1">{l.role}</p>
            <p className="font-body text-sm text-inkmuted mt-2">{l.bio}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display font-bold text-2xl text-green mt-12 mb-4">Plan your visit</h2>
      <p className="font-body text-inkmuted leading-relaxed">
        We meet Sundays at 10:00am and 12:30pm at Pamoja Hall, along Kilifi-Mombasa Road,
        Mtwapa. Children's ministry runs during both services. Come as you are — there's a seat
        for you.
      </p>
    </div>
  );
}
