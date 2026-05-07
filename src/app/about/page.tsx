import Link from "next/link";
import { BookOpenText, LibraryBig, PenSquare } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { editorialTheme } from "@/overrides/editorial-ui";

const highlights = [
  { label: "Essays published", value: "12k+" },
  { label: "Archive readers", value: "180k" },
  { label: "Issue notes kept live", value: "8.6k" },
];

const values = [
  { title: "Edited with intention", description: "Pieces should feel selected, paced, and framed like a publication rather than dropped into a generic feed." },
  { title: "Built for reading comfort", description: "Typography, whitespace, and hierarchy are treated as part of the product, not decorative extras." },
  { title: "Open archive, strong issue focus", description: "Current stories lead discovery while the broader archive stays searchable and accessible by route." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is an independent editorial journal built for essays, commentary, and a slower archive-driven reading experience.`}
      actions={
        <>
          <Button variant="outline" asChild className="rounded-full border-[#d7c2ac] bg-[rgba(255,251,245,0.82)] text-[#241612] hover:bg-[#fbf1e6]">
            <Link href="/team">Meet the Team</Link>
          </Button>
          <Button asChild className={`rounded-full ${editorialTheme.copperButton}`}>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className={`overflow-hidden ${editorialTheme.paperPanel}`}>
          <CardContent className="space-y-5 p-6 sm:p-8">
            <Badge className="rounded-full border-0 bg-[#f2e1d0] text-[#9b6543] shadow-none">Editorial Desk</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A publication shell designed to feel crafted, not cloned.
            </h2>
            <p className="text-sm leading-8 text-[#715a4c]">
              {SITE_CONFIG.name} treats article publishing as the lead experience. Instead of surfacing every possible task as an equal product lane, the site gives essays, cultural notes, and long-form reading a stronger cover-story rhythm, warmer tone, and clearer reading hierarchy.
            </p>
            <p className="text-sm leading-8 text-[#715a4c]">
              The underlying system still supports the broader route set, but the product now behaves like a distinct editorial journal: current stories up front, archive access close by, and supporting surfaces kept secondary unless a reader actively goes looking for them.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-[#dec8b2] bg-[#fbf2e8] p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8d6e5d]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className={`overflow-hidden ${editorialTheme.paperPanel}`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#715a4c]">{value.description}</p>
              </CardContent>
            </Card>
          ))}

          <Card className={`overflow-hidden text-white ${editorialTheme.darkPanel}`}>
            <CardContent className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c79e81]">How the publication works</p>
              <div className="mt-4 space-y-4">
                {[
                  { icon: BookOpenText, title: "Lead stories", body: "Homepage modules behave like an issue cover instead of a utility dashboard." },
                  { icon: LibraryBig, title: "Archive access", body: "Search and internal routes keep the wider library reachable without cluttering the front door." },
                  { icon: PenSquare, title: "Contributor voice", body: "Writing is framed with more space, stronger contrast, and calmer support UI." },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <item.icon className="h-4 w-4 text-[#df9a65]" />
                    <h4 className="mt-3 text-base font-semibold text-[#fff1e1]">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-[#d9c4b4]">{item.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </PageShell>
  );
}
