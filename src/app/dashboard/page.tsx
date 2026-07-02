import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.email === process.env.ADMIN_EMAIL;

  const [members, events, sermons, posts, galleryItems, requests] = await Promise.all([
    prisma.member.count(),
    prisma.event.count(),
    prisma.sermon.count(),
    prisma.blogPost.count(),
    prisma.galleryItem.count(),
    prisma.membershipRequest.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Admin Area</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-2">
        Welcome, {session?.user?.name || "Admin"}
      </h1>
      <p className="font-body text-inkmuted/70 mb-10">{session?.user?.email}</p>

      <div className="grid gap-4 md:grid-cols-5 mb-10">
        {[
          { label: "Members", value: members },
          { label: "Events", value: events },
          { label: "Sermons", value: sermons },
          { label: "Blog Posts", value: posts },
          { label: "Gallery Items", value: galleryItems },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-clay bg-surface p-4">
            <p className="font-body text-sm text-inkmuted">{item.label}</p>
            <p className="font-display text-3xl text-green">{item.value}</p>
          </div>
        ))}
      </div>

      {!isAdmin ? (
        <div className="rounded-lg border border-gold bg-cream p-5 text-sm text-inkmuted">
          Your account is not marked as an admin yet. Set ADMIN_EMAIL in your environment to unlock full admin tools.
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-clay bg-white p-6">
              <h2 className="font-display text-2xl text-green mb-4">Content management</h2>
              <p className="font-body text-sm text-inkmuted mb-6">
                Add new blog posts and gallery photos from here. These entries will be stored in the database.
              </p>
              <div className="space-y-4">
                <a href="/dashboard/blog" className="block rounded-lg border border-clay p-4 hover:bg-surface">
                  <p className="font-body font-bold text-green">Create a blog post</p>
                  <p className="font-body text-sm text-inkmuted">Publish updates, announcements, and ministry insights.</p>
                </a>
                <a href="/dashboard/gallery" className="block rounded-lg border border-clay p-4 hover:bg-surface">
                  <p className="font-body font-bold text-green">Upload gallery photos</p>
                  <p className="font-body text-sm text-inkmuted">Add visual highlights from worship, outreach, and fellowship.</p>
                </a>
                <a href="/dashboard/sermons" className="block rounded-lg border border-clay p-4 hover:bg-surface">
                  <p className="font-body font-bold text-green">Manage sermons</p>
                  <p className="font-body text-sm text-inkmuted">Keep sermon videos and audio links updated in the database.</p>
                </a>
              </div>
            </section>

            <section className="rounded-2xl border border-clay bg-white p-6">
              <h2 className="font-display text-2xl text-green mb-4">Membership requests</h2>
              <div className="space-y-3">
                {requests.map((request) => (
                  <div key={request.id} className="rounded-lg border border-clay p-4">
                    <div className="flex justify-between gap-3">
                      <p className="font-body font-bold text-green">{request.name}</p>
                      <span className="text-[0.7rem] uppercase tracking-wide text-gold">{request.status}</span>
                    </div>
                    <p className="font-body text-sm text-inkmuted">{request.email}</p>
                    {request.message && <p className="font-body text-sm text-inkmuted mt-2">{request.message}</p>}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-clay bg-white p-6 h-fit">
            <h2 className="font-display text-2xl text-green mb-4">Admin tools</h2>
            <ul className="space-y-3 text-sm text-inkmuted">
              <li>• Promote another member to admin through the role management form.</li>
              <li>• Configure EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, and EMAIL_FROM for notifications.</li>
              <li>• Use the content links to add new public-facing content.</li>
            </ul>
            <div className="mt-6">
              <a href="/dashboard/roles" className="inline-block rounded bg-gold px-4 py-2 font-body text-sm font-bold text-green">Manage roles</a>
            </div>
            <div className="mt-8">
              <SignOutButton />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
