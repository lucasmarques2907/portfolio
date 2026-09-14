const API = "https://api.github.com";
const REVALIDATE_SECONDS = 1800;

export type Commit = {
  sha: string;
  repo: string;
  fullRepo: string;
  message: string;
  url: string;
  additions: number | null;
  deletions: number | null;
};

type PushEvent = {
  type: string;
  repo: { name: string };
  payload?: { head?: string };
};

export type Language = {
  name: string;
  percent: number;
  color: string;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#663399",
  Vue: "#41b883",
  Shell: "#89e051",
  SCSS: "#c6538c",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
};

const FALLBACK_COLOR = "#7F849C";

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchCommit(fullRepo: string, sha: string) {
  try {
    const res = await fetch(`${API}/repos/${fullRepo}/commits/${sha}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      commit?: { message?: string };
      stats?: { additions: number; deletions: number };
    };

    return {
      message: data.commit?.message?.split("\n")[0] ?? "(sem mensagem)",
      additions: data.stats?.additions ?? null,
      deletions: data.stats?.deletions ?? null,
    };
  } catch {
    return null;
  }
}

export async function getRecentCommits(limit = 3): Promise<Commit[]> {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error("GITHUB_USERNAME não definida");
  }

  const res = await fetch(
    `${API}/users/${username}/events/public?per_page=50`,
    { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (!res.ok) {
    throw new Error(`GitHub respondeu ${res.status}`);
  }

  const events = (await res.json()) as PushEvent[];
  const seen = new Set<string>();
  const pushes: { sha: string; fullRepo: string }[] = [];

  for (const event of events) {
    if (event.type !== "PushEvent") continue;

    const sha = event.payload?.head;
    if (!sha || seen.has(sha)) continue;

    seen.add(sha);
    pushes.push({ sha, fullRepo: event.repo.name });

    if (pushes.length >= limit) break;
  }

  const details = await Promise.all(
    pushes.map((push) => fetchCommit(push.fullRepo, push.sha)),
  );

  return pushes
    .map((push, index) => {
      const detail = details[index];
      if (!detail) return null;

      return {
        sha: push.sha,
        repo: push.fullRepo.split("/")[1],
        fullRepo: push.fullRepo,
        message: detail.message,
        url: `https://github.com/${push.fullRepo}/commit/${push.sha}`,
        additions: detail.additions,
        deletions: detail.deletions,
      };
    })
    .filter((commit): commit is Commit => commit !== null);
}

export async function getLanguages(limit = 8): Promise<Language[]> {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error("GITHUB_USERNAME não definida");
  }

  const res = await fetch(
    `${API}/users/${username}/repos?per_page=100&sort=pushed&type=owner`,
    { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (!res.ok) {
    throw new Error(`GitHub respondeu ${res.status}`);
  }

  const repos = (await res.json()) as { full_name: string; fork: boolean }[];

  const results = await Promise.all(
    repos
      .filter((repo) => !repo.fork)
      .map(async (repo) => {
        try {
          const langRes = await fetch(
            `${API}/repos/${repo.full_name}/languages`,
            {
              headers: githubHeaders(),
              next: { revalidate: REVALIDATE_SECONDS },
            },
          );

          if (!langRes.ok) return {};

          return (await langRes.json()) as Record<string, number>;
        } catch {
          return {};
        }
      }),
  );

  const totals: Record<string, number> = {};

  for (const repo of results) {
    for (const [name, bytes] of Object.entries(repo)) {
      totals[name] = (totals[name] ?? 0) + bytes;
    }
  }

  const grandTotal = Object.values(totals).reduce((sum, n) => sum + n, 0);

  if (grandTotal === 0) return [];

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, bytes]) => ({
      name,
      percent: (bytes / grandTotal) * 100,
      color: LANGUAGE_COLORS[name] ?? FALLBACK_COLOR,
    }));
}
