export interface GitHubActivitySquare {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  weekIndex: number;
  dayOfWeek: number;
  tooltip: string;
}

export interface StackAllocationStat {
  domain: string;
  share: number;
  focus: string;
  color: string;
}

export interface GitHubPortfolioData {
  username: string;
  profileUrl: string;
  source: "graphql" | "profile-live" | "fallback";
  totalContributions: number;
  summaryText: string;
  squares: GitHubActivitySquare[];
  stackAllocation: StackAllocationStat[];
  fetchedAt: string;
}

const GITHUB_USERNAME = "mohdsufiyaan";

const CORE_STACK_ALLOCATION: StackAllocationStat[] = [
  {
    domain: "AI Agents & RAG",
    share: 28,
    focus: "Laravel AI SDK · 39 Tools · Pinecone · Multi-LLM",
    color: "#fb923c",
  },
  {
    domain: "Backend & APIs",
    share: 26,
    focus: "Laravel 12 · Node.js · Express 5 · Settlement Ledger",
    color: "#38bdf8",
  },
  {
    domain: "Real-Time & Queues",
    share: 18,
    focus: "Socket.IO Redis Adapter · BullMQ · SSE · Workers",
    color: "#34d399",
  },
  {
    domain: "Web & Mobile",
    share: 18,
    focus: "Next.js 16 · React 19 · React Native 0.87",
    color: "#a78bfa",
  },
  {
    domain: "Cloud & Testing",
    share: 10,
    focus: "AWS S3/CloudFront · PM2 · 145+ Automated Tests",
    color: "#22d3ee",
  },
];

function clampLevel(val: number): 0 | 1 | 2 | 3 | 4 {
  if (val <= 0) return 0;
  if (val === 1) return 1;
  if (val === 2) return 2;
  if (val === 3) return 3;
  return 4;
}

function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function parseTooltipCount(tooltip: string, level: number): number {
  const m = tooltip.match(/^(\d+)\s+contribution/i);
  if (m) return Number.parseInt(m[1], 10);
  if (/^No\s+contribution/i.test(tooltip)) return 0;
  return level;
}

/**
 * Priority 1: Official GitHub GraphQL API when server-only GITHUB_TOKEN is provided.
 */
async function fetchViaGraphQL(token: string): Promise<GitHubPortfolioData | null> {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        url
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "mohd-sufiyan-portfolio",
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(6000),
  });

  if (!res.ok) return null;
  const json = await res.json();
  const user = json?.data?.user;
  const calendar = user?.contributionsCollection?.contributionCalendar;
  if (!calendar?.weeks) return null;

  const squares: GitHubActivitySquare[] = [];
  calendar.weeks.forEach(
    (
      week: { contributionDays: Array<{ date: string; contributionCount: number }> },
      weekIndex: number,
    ) => {
      week.contributionDays.forEach((day, dayOfWeek) => {
        const count = day.contributionCount ?? 0;
        const formattedDate = new Date(`${day.date}T00:00:00Z`).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" },
        );
        squares.push({
          date: day.date,
          count,
          level: countToLevel(count),
          weekIndex,
          dayOfWeek,
          tooltip:
            count === 0
              ? `No contributions on ${formattedDate}`
              : `${count} ${count === 1 ? "contribution" : "contributions"} on ${formattedDate}`,
        });
      });
    },
  );

  const total = calendar.totalContributions ?? 0;

  return {
    username: user.login || GITHUB_USERNAME,
    profileUrl: user.url || `https://github.com/${GITHUB_USERNAME}`,
    source: "graphql",
    totalContributions: total,
    summaryText: `${total.toLocaleString()} contributions in the last year`,
    squares,
    stackAllocation: CORE_STACK_ALLOCATION,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Priority 2: Exact real GitHub profile contribution calendar endpoint (includes private contributions
 * if enabled on the GitHub profile, without exposing any repository names or requiring a token).
 */
async function fetchExactProfileContributions(): Promise<GitHubPortfolioData | null> {
  const res = await fetch(
    `https://github.com/users/${GITHUB_USERNAME}/contributions`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioTelemetry/1.0)",
        Accept: "text/html",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(7000),
    },
  );

  if (!res.ok) return null;
  const html = await res.text();

  // Map component IDs to exact GitHub tooltips (e.g. "9 contributions on July 10th.")
  const tooltipMap = new Map<string, string>();
  const tipRegex =
    /<tool-tip[^>]*for="(contribution-day-component-[^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  let tipMatch: RegExpExecArray | null;
  while ((tipMatch = tipRegex.exec(html)) !== null) {
    tooltipMap.set(tipMatch[1], tipMatch[2].replace(/\s+/g, " ").trim());
  }

  // Extract every contribution <td> cell with exact date, level, and id
  const rawDays: Array<{
    date: string;
    level: 0 | 1 | 2 | 3 | 4;
    count: number;
    tooltip: string;
  }> = [];

  const tdRegex = /<td\b[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;
  let tdMatch: RegExpExecArray | null;
  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const tag = tdMatch[0];
    const date = tdMatch[1];
    const levelMatch = tag.match(/data-level="(\d)"/);
    const idMatch = tag.match(/id="(contribution-day-component-[^"]+)"/);
    const level = clampLevel(levelMatch ? Number.parseInt(levelMatch[1], 10) : 0);
    const tip = idMatch ? tooltipMap.get(idMatch[1]) ?? "" : "";
    const count = parseTooltipCount(tip, level);

    rawDays.push({
      date,
      level,
      count,
      tooltip: tip || (count > 0 ? `${count} contributions on ${date}` : `No contributions on ${date}`),
    });
  }

  if (rawDays.length < 30) return null;

  // Sort chronologically so week columns & Sun-Sat rows match GitHub profile exactly
  rawDays.sort((a, b) => a.date.localeCompare(b.date));

  // Align week indices starting from Sunday of the first date's week (GitHub calendar layout)
  const firstDate = new Date(`${rawDays[0].date}T00:00:00Z`);
  const firstSunday = new Date(firstDate);
  firstSunday.setUTCDate(firstDate.getUTCDate() - firstDate.getUTCDay());

  const squares: GitHubActivitySquare[] = rawDays.map((day) => {
    const cur = new Date(`${day.date}T00:00:00Z`);
    const diffDays = Math.round(
      (cur.getTime() - firstSunday.getTime()) / 86_400_000,
    );
    return {
      date: day.date,
      count: day.count,
      level: day.level,
      weekIndex: Math.floor(diffDays / 7),
      dayOfWeek: cur.getUTCDay(),
      tooltip: day.tooltip,
    };
  });

  // Extract official total heading from GitHub HTML
  const headingMatch = html.match(
    /id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/,
  );
  const headingText = headingMatch
    ? headingMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    : "";
  const totalMatch = headingText.match(/([\d,]+)\s+contribution/i);
  const totalContributions = totalMatch
    ? Number.parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : squares.reduce((acc, d) => acc + d.count, 0);

  return {
    username: GITHUB_USERNAME,
    profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    source: "profile-live",
    totalContributions,
    summaryText:
      headingText ||
      `${totalContributions.toLocaleString()} contributions in the last year`,
    squares,
    stackAllocation: CORE_STACK_ALLOCATION,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Safe empty-state fallback only if GitHub is completely unreachable at runtime.
 */
function buildEmptyYearGrid(): GitHubActivitySquare[] {
  const squares: GitHubActivitySquare[] = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const totalDays = 52 * 7;
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - (totalDays - 1));
  const firstSunday = new Date(start);
  firstSunday.setUTCDate(start.getUTCDate() - start.getUTCDay());

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const diffDays = Math.round(
      (d.getTime() - firstSunday.getTime()) / 86_400_000,
    );
    const iso = d.toISOString().slice(0, 10);
    squares.push({
      date: iso,
      count: 0,
      level: 0,
      weekIndex: Math.floor(diffDays / 7),
      dayOfWeek: d.getUTCDay(),
      tooltip: `Private activity on ${iso}`,
    });
  }
  return squares;
}

export async function getGitHubPortfolioData(): Promise<GitHubPortfolioData> {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (token) {
    try {
      const gql = await fetchViaGraphQL(token);
      if (gql) return gql;
    } catch {
      /* fall through to live GitHub profile contributions */
    }
  }

  try {
    const liveProfile = await fetchExactProfileContributions();
    if (liveProfile) return liveProfile;
  } catch {
    /* fall through to safe fallback */
  }

  return {
    username: GITHUB_USERNAME,
    profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    source: "fallback",
    totalContributions: 0,
    summaryText: "GitHub contributions syncing",
    squares: buildEmptyYearGrid(),
    stackAllocation: CORE_STACK_ALLOCATION,
    fetchedAt: new Date().toISOString(),
  };
}
