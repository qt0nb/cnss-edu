import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const attempt = await db.quizAttempt.create({
      data: {
        quizKey: String(body.quizKey ?? "unknown").slice(0, 64),
        score: Number(body.score) || 0,
        total: Number(body.total) || 0,
        mode: String(body.mode ?? "practice").slice(0, 32),
      },
    });
    return NextResponse.json({ ok: true, attempt });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function GET() {
  try {
    const attempts = await db.quizAttempt.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    return NextResponse.json({ ok: true, attempts });
  } catch {
    return NextResponse.json({ ok: false, attempts: [] }, { status: 200 });
  }
}
