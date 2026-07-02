import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const memberId = (session?.user as any)?.id;

  const donations = memberId
    ? await prisma.donation.findMany({
        where: { memberId },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2">Member Area</p>
      <h1 className="font-display font-bold text-4xl heading-rule text-green mb-2">
        Welcome, {session?.user?.name}
      </h1>
      <p className="font-body text-inkmuted/60 mb-10">{session?.user?.email}</p>

      <h2 className="font-display font-bold text-2xl text-green mb-4">Your giving history</h2>
      {donations.length === 0 ? (
        <p className="font-body text-inkmuted">
          No gifts linked to your account yet. Gifts given while logged in will show up here.
        </p>
      ) : (
        <ul className="divide-y divide-clay border border-clay rounded">
          {donations.map((d) => (
            <li key={d.id} className="flex justify-between px-4 py-3 font-body text-sm">
              <span>{d.fund}</span>
              <span>${(d.amountCents / 100).toFixed(2)}</span>
              <span className="text-inkmuted/60">
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <SignOutButton />
      </div>
    </div>
  );
}
