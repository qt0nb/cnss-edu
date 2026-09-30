import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Upsert the learner's synced progress snapshot (persisted in SQLite via Prisma). */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const profile = await db.profile.upsert({
      where: { id: "main" },
      create: {
        id: "main",
        xp: Number(body?.xp ?? 0) || 0,
        lessons: Object.keys(body?.completedLessons ?? {}).length,
        streak: Number(body?.streak ?? 0) || 0,
        dataJson: JSON.stringify(body ?? {}),
      },
      update: {
        xp: Number(body?.xp ?? 0) || 0,
        lessons: Object.keys(body?.completedLessons ?? {}).length,
        streak: Number(body?.streak ?? 0) || 0,
        dataJson: JSON.stringify(body ?? {}),
      },
    });
    return NextResponse.json({ ok: true, profile: { id: profile.id, xp: profile.xp, updatedAt: profile.updatedAt } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 });
  }
}

/** Fetch the last synced snapshot (server-side backup restore). */
export async function GET() {
  try {
    const profile = await db.profile.findUnique({ where: { id: "main" } });
    if (!profile) return NextResponse.json({ ok: true, data: null });
    let data: unknown = null;
    try {
      data = JSON.parse(profile.dataJson);
    } catch {
      data = null;
    }
    return NextResponse.json({ ok: true, data, meta: { xp: profile.xp, lessons: profile.lessons, streak: profile.streak, updatedAt: profile.updatedAt } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 });
  }
}
