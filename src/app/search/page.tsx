import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Compass, FileText, Search, Sparkles } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search the archive"
      description={
        query
          ? `Results for "${query}"`
          : "Look across the full publication system without changing which routes remain available."
      }
      actions={
        <form action="/search" method="GET" className="flex w-full gap-2 sm:w-auto">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search essays, archive items, and more"
              className="h-11 rounded-full border-white/10 bg-white/8 pl-9 text-[#f6ead8] placeholder:text-[#c8b09f]"
            />
          </div>
          <Button type="submit" className="h-11 rounded-full bg-[linear-gradient(135deg,#d8874d,#f1b06c)] px-5 text-[#1f130f] hover:opacity-95">
            Search
          </Button>
        </form>
      }
    >
      <div className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#d6c2aa] bg-[linear-gradient(180deg,rgba(255,251,245,0.97),rgba(251,244,235,0.96))] p-6 shadow-[0_24px_72px_rgba(69,38,20,0.10)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(217,144,87,0.25)] bg-[rgba(217,144,87,0.10)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d99057]">
            <Compass className="h-3.5 w-3.5" />
            Archive guidance
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#241612]">
            Search is still driven by the same query logic, now with a clearer editorial frame.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#715a4c]">
            Use keywords, categories, or route-specific terms to move through the publication archive. Results still come from the same feed and query parameters, but the page now helps readers understand how to search the site more effectively.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              icon: FileText,
              title: "Search by topic",
              body: "Try subjects, themes, or recurring categories to pull related pieces together.",
            },
            {
              icon: Sparkles,
              title: "Search by intent",
              body: "Use phrases from headlines, summaries, or body copy to surface deeper archive matches.",
            },
            {
              icon: Search,
              title: "Query stays intact",
              body: "No backend or ranking logic changed, only the presentation and supporting guidance.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-[#d7c3af] bg-[rgba(255,251,245,0.84)] p-5 shadow-[0_16px_40px_rgba(69,38,20,0.06)]">
              <item.icon className="h-4 w-4 text-[#b17248]" />
              <h3 className="mt-3 text-base font-semibold text-[#241612]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#715a4c]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9c6b4b]">
            {query ? "Search results" : "Latest archive"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#241612]">
            {query ? `${results.length} matching result${results.length === 1 ? "" : "s"}` : "Browse recent posts across available routes"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {query ? (
            <span className="rounded-full border border-[#d9c5b0] bg-[rgba(255,251,245,0.82)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f594c]">
              Query: {query}
            </span>
          ) : null}
          {category ? (
            <span className="rounded-full border border-[#d9c5b0] bg-[rgba(255,251,245,0.82)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f594c]">
              Category: {category}
            </span>
          ) : null}
          {task ? (
            <span className="rounded-full border border-[#d9c5b0] bg-[rgba(255,251,245,0.82)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f594c]">
              Task: {task}
            </span>
          ) : null}
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} taskKey={task || undefined} />;
          })}
        </div>
      ) : (
        <div className="rounded-[1.8rem] border border-dashed border-[#d6c2aa] bg-[rgba(255,251,245,0.84)] p-10 text-center text-[#6f594c]">
          No matching posts yet.
        </div>
      )}
    </PageShell>
  );
}
