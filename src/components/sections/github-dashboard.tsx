"use client";
import { BookMarked, Star, Users, Activity, RefreshCw, ArrowUpRight } from "lucide-react";
import { useGithubStats } from "@/hooks/use-github-stats";
import { languageColor } from "@/lib/github";
import { siteConfig } from "@/data/site";
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-2 rounded-sm border border-line-strong bg-paper/70 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 text-steel">{icon}<span className="text-mono-label">{label}</span></div>
      <p className="font-display text-2xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
function SkeletonBlock({ className }: { className?: string }) { return <div className={`animate-pulse rounded-sm bg-line ${className}`} />; }
function DashboardSkeleton() { return <div className="space-y-8"><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-20" />)}</div><SkeletonBlock className="h-12" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-28" />)}</div></div>; }
function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-sm border border-line-strong bg-paper/50 py-14 text-center">
      <p className="text-mono-label text-signal">CONNECTION FAILED</p>
      <p className="max-w-sm text-sm text-steel">{message}</p>
      <button type="button" onClick={onRetry} className="flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-signal hover:text-signal"><RefreshCw size={14} aria-hidden />Retry</button>
    </div>
  );
}
export function GithubDashboard() {
  const { data, loading, error, retry } = useGithubStats(siteConfig.githubUsername);
  if (loading) return <DashboardSkeleton />;
  if (error || !data) return <DashboardError message={error ?? "Something went wrong."} onRetry={retry} />;
  const totalLanguageCount = data.languageCounts.reduce((sum, l) => sum + l.count, 0);
  const topEventCount = data.recentEventBreakdown[0]?.count ?? 1;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={<BookMarked size={14} aria-hidden />} label="REPOSITORIES" value={data.user.public_repos} />
        <StatCard icon={<Star size={14} aria-hidden />} label="TOTAL STARS" value={data.totalStars} />
        <StatCard icon={<Users size={14} aria-hidden />} label="FOLLOWERS" value={data.user.followers} />
        <StatCard icon={<Activity size={14} aria-hidden />} label="RECENT EVENTS" value={data.recentEventCount} />
      </div>
      {data.languageCounts.length > 0 && (
        <div>
          <p className="text-mono-label mb-3 text-steel">TOP LANGUAGES — BY REPO COUNT</p>
          <div className="flex h-3 w-full overflow-hidden rounded-full border border-line-strong">
            {data.languageCounts.map(l => <div key={l.language} style={{ width: `${(l.count / totalLanguageCount) * 100}%`, backgroundColor: languageColor(l.language) }} />)}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {data.languageCounts.map(l => <div key={l.language} className="flex items-center gap-1.5 text-sm text-steel"><span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor(l.language) }} />{l.language}<span className="text-mono-label text-steel/70">{Math.round((l.count / totalLanguageCount) * 100)}%</span></div>)}
          </div>
        </div>
      )}
      {data.recentEventBreakdown.length > 0 && (
        <div>
          <p className="text-mono-label mb-3 text-steel">RECENT PUBLIC ACTIVITY</p>
          <div className="space-y-2">
            {data.recentEventBreakdown.map(e => (
              <div key={e.type} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm text-steel">{e.type}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full bg-signal" style={{ width: `${(e.count / topEventCount) * 100}%` }} /></div>
                <span className="text-mono-label w-6 text-right text-steel">{e.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.recentProjects.length > 0 && (
        <div>
          <p className="text-mono-label mb-3 text-steel">RECENT PROJECTS</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.recentProjects.map(repo => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group flex flex-col gap-2 rounded-sm border border-line-strong bg-paper/70 p-4 backdrop-blur-md transition-colors hover:border-signal/50">
                <div className="flex items-center justify-between gap-2"><p className="font-display text-base font-bold text-ink">{repo.name}</p><ArrowUpRight size={14} className="shrink-0 text-steel transition-colors group-hover:text-signal" /></div>
                <p className="line-clamp-2 flex-1 text-sm text-steel">{repo.description ?? "No description provided."}</p>
                <div className="text-mono-label flex items-center gap-3 text-steel">
                  {repo.language && <span className="flex items-center gap-1.5"><span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor(repo.language) }} />{repo.language}</span>}
                  <span className="flex items-center gap-1"><Star size={12} aria-hidden /> {repo.stargazers_count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
