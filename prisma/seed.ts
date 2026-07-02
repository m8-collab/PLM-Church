import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Sample member login: grace@example.org / password123
  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.member.upsert({
    where: { email: "grace@example.org" },
    update: {},
    create: { name: "Grace Wanjiru", email: "grace@example.org", password: passwordHash },
  });

  const now = new Date();
  const inDays = (d: number) => new Date(now.getTime() + d * 86400000);

  await prisma.event.createMany({
    data: [
      {
        title: "Sunday Worship Service",
        description: "Main sanctuary — all are welcome. Children's ministry available.",
        location: "Pamoja Hall, Main Sanctuary",
        startTime: inDays(3),
      },
      {
        title: "Church Prayer Night",
        description: "An evening of intercession and worship together. Come hungry, leave full.",
        location: "Pamoja Hall, Fellowship Room",
        startTime: inDays(6),
      },
      {
        title: "Youth Retreat — Stepping Into Purpose",
        description: "A weekend retreat for our young adults. Ages 16-30. Registration open.",
        location: "Diani Beach Retreat Center",
        startTime: inDays(10),
      },
      {
        title: "Outreach Saturday — Karibu Mtaa",
        description: "Join us as we serve our neighborhood with food, prayer, and presence.",
        location: "Mtwapa town center",
        startTime: inDays(14),
      },
    ],
  });

  await prisma.sermon.createMany({
    data: [
      {
        title: "When the Storms Come, Whose House Are You In?",
        speaker: "Pastor Lyanne Ngugi",
        series: "Firm Foundation",
        date: inDays(-7),
        summary: "A message on building our lives on the unshakeable rock of Christ.",
        videoUrl: "https://example.com/sermons/whose-house",
      },
      {
        title: "The Body of Christ Was Never Meant to Walk Alone",
        speaker: "Pastor Lyanne Ngugi",
        series: "Pamoja Series",
        date: inDays(-14),
        summary: "Why community is not optional — and how to find yours.",
        videoUrl: "https://example.com/sermons/never-walk-alone",
      },
      {
        title: "Grace That Is Greater Than All Our Failures",
        speaker: "Pastor Lyanne Ngugi",
        series: "Firm Foundation",
        date: inDays(-21),
        summary: "Exploring the lavish, undeserved love of a God who restores.",
        videoUrl: "https://example.com/sermons/grace-greater",
      },
    ],
  });

  console.log("Seed complete. Sample login: grace@example.org / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
