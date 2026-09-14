import { bumpCounter, readCounter } from "@/lib/counter";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CONFIG = {
  scope: "clicks",
  slug: "button",
  limit: 300,
  windowSeconds: 60,
};

export async function POST() {
  try {
    const result = await bumpCounter(CONFIG);

    if (!result.allowed) {
      return NextResponse.json(
        { count: result.count, retryAfter: result.retryAfter },
        {
          status: 429,
          headers: { "Retry-After": String(result.retryAfter) },
        },
      );
    }

    return NextResponse.json({
      count: result.count,
      remaining: result.remaining,
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
