import { sql } from "./db";
import { getClientHash } from "./client-id";

type BumbOptions = {
  scope: string;
  slug: string;
  limit: number;
  windowSeconds: number;
};

export type BumbResult = {
  count: number;
  allowed: boolean;
  remaining: number;
  retryAfter: number;
};

export async function bumpCounter({
  scope,
  slug,
  limit,
  windowSeconds,
}: BumbOptions): Promise<BumbResult> {
  const ipHash = await getClientHash();

  const limitRows = await sql`
    INSERT INTO rate_limits (scope, ip_hash, hits, window_start)
    VALUES (${scope}, ${ipHash}, 1, now())
    ON CONFLICT (scope, ip_hash) DO UPDATE
      SET
        hits = CASE
          WHEN EXTRACT(EPOCH FROM now() - rate_limits.window_start) >= ${windowSeconds}
          THEN 1
          ELSE rate_limits.hits + 1
        END,
        window_start = CASE
          WHEN EXTRACT(EPOCH FROM now() - rate_limits.window_start) >= ${windowSeconds}
          THEN now()
          ELSE rate_limits.window_start
        END
    RETURNING
      hits,
      EXTRACT(EPOCH FROM now() - window_start) AS elapsed
  `;

  const hits = Number(limitRows[0].hits);
  const elapsed = Number(limitRows[0].elapsed);

  if (hits > limit) {
    return {
      count: await readCounter(slug),
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil(windowSeconds - elapsed)),
    };
  }

  const counterRows = await sql`
    INSERT INTO counters (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug) DO UPDATE
      SET count = counters.count + 1
    RETURNING count
  `;

  return {
    count: Number(counterRows[0].count),
    allowed: true,
    remaining: limit - hits,
    retryAfter: 0,
  };
}

export async function readCounter(slug: string): Promise<number> {
  const rows = await sql`SELECT count FROM counters WHERE slug = ${slug}`;
  return Number(rows[0]?.count ?? 0);
}

export async function cleanupRateLimits(): Promise<void> {
  await sql`
  DELETE FROM rate_limits WHERE window_start < now() - interval '1 day'
  `.catch(() => {});
}
