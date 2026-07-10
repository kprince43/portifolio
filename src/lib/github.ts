const GITHUB_API = "https://api.github.com";

export interface GithubUser {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  avatar_url: string;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
}

export interface LanguageCount { language: string; count: number; }
export interface EventBreakdown { type: string; count: number; }

export interface GithubStatsResult {
  user: GithubUser;
  totalStars: number;
  languageCounts: LanguageCount[];
  recentProjects: GithubRepo[];
  recentEventCount: number;
  recentEventBreakdown: EventBreakdown[];
}

export class GithubApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GithubApiError";
    this.status = status;
  }
}

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    if (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0")
      throw new GithubApiError("GitHub API rate limit reached. Try again later.", 403);
    if (res.status === 404) throw new GithubApiError("GitHub user not found.", 404);
    throw new GithubApiError(`GitHub API error (${res.status}).`, res.status);
  }
  return res.json() as Promise<T>;
}

let cache: { username: string; data: GithubStatsResult; expiresAt: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchGithubStats(username: string): Promise<GithubStatsResult> {
  if (cache && cache.username === username && cache.expiresAt > Date.now()) return cache.data;

  const [user, repos, events] = await Promise.all([
    githubFetch<GithubUser>(`/users/${username}`),
    githubFetch<GithubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
    githubFetch<{ type: string }[]>(`/users/${username}/events/public?per_page=100`).catch(() => []),
  ]);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const langMap = new Map<string, number>();
  repos.forEach(r => { if (r.language) langMap.set(r.language, (langMap.get(r.language) ?? 0) + 1); });
  const languageCounts = [...langMap.entries()].map(([language, count]) => ({ language, count })).sort((a, b) => b.count - a.count).slice(0, 6);
  const recentProjects = repos.filter(r => !r.fork).sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()).slice(0, 4);
  const evtMap = new Map<string, number>();
  events.forEach(e => evtMap.set(e.type, (evtMap.get(e.type) ?? 0) + 1));
  const recentEventBreakdown = [...evtMap.entries()].map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count).slice(0, 5);

  const result: GithubStatsResult = { user, totalStars, languageCounts, recentProjects, recentEventCount: events.length, recentEventBreakdown };
  cache = { username, data: result, expiresAt: Date.now() + CACHE_TTL };
  return result;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051", Java: "#b07219",
};
export function languageColor(lang: string) { return LANG_COLORS[lang] ?? "#5c6470"; }
