import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getClientHash } from "@/lib/client-id";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const ipHash = await getClientHash();

    const rows = await sql`
      WITH attempt AS (
        INSERT INTO view_hits (ip_hash, last_hit)
        VALUES (${ipHash}, now())
        ON CONFLICT (ip_hash) DO UPDATE
          SET last_hit = now()
          WHERE view_hits.last_hit < now() - interval '1 second'
        RETURNING 1
      ),
      bumped AS (
        INSERT INTO page_views (slug, count)
        SELECT 'site', 1 FROM attempt
        ON CONFLICT (slug) DO UPDATE
            SET count = page_views.count + 1
        RETURNING count
    )
      SELECT
        COALESCE(
          (SELECT count FROM bumped),
          (SELECT count FROM page_views WHERE slug = 'site')
        ) AS count,
        EXISTS (SELECT 1 FROM attempt) AS counted
    `;

    if (Math.random() < 0.01) {
      await sql`DELETE FROM view_hits WHERE last_hit < now() - interval '1 day'`.catch(
        () => {},
      );
    }

    return NextResponse.json({
      count: Number(rows[0].count),
      counted: rows[0].counted,
    });
  } catch {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql`SELECT count FROM page_views WHERE slug = 'site'`;
    return NextResponse.json({ count: Number(rows[0]?.count ?? 0) });
  } catch {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}
