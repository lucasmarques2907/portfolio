import { bumpCounter, cleanupRateLimits, readCounter } from "@/lib/counter";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CONFIG = {
  scope: "views",
  slug: "site",
  limit: 1,
  windowSeconds: 1,
};

export async function POST() {
  try {
    const result = await bumpCounter(CONFIG);

    if (Math.random() < 0.01) await cleanupRateLimits();

    return NextResponse.json({
      count: result.count,
      counted: result.allowed,
    });
  } catch {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ count: await readCounter(CONFIG.slug) });
  } catch {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}
