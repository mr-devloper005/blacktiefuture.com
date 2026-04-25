"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";
import { editorialTheme } from "@/overrides/editorial-ui";
import { Footer } from "@/components/shared/footer";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Compose a long-form piece for the archive. HTML is allowed in the body; drafts save in your browser after sign-in.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;
  const isArticle = taskKey === "article";
  const backHref = isArticle ? "/articles" : "/";

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const fieldClass = (extra?: string) =>
    cn(
      isArticle
        ? "border border-[#d9c5b0] bg-white text-[#241612] focus-visible:ring-2 focus-visible:ring-[#d8874d]/30"
        : "border-2 border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-primary/30",
      extra
    );

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Task not available</h1>
          <p className="mt-2 text-muted-foreground">
            This task is not enabled for the current site.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </main>
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  return (
    <div className={isArticle ? `min-h-screen ${editorialTheme.backdrop}` : "min-h-screen bg-background"}>
      <NavbarShell />
      {isArticle ? (
        <div className={editorialTheme.masthead}>
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-6 sm:px-6">
            <Button variant="ghost" size="icon" asChild className="shrink-0 text-[#f5ead7] hover:bg-white/10">
              <Link href={backHref} aria-label="Back to articles">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#fff1e1]">{formConfig.title}</h1>
              <p className="mt-1 text-sm text-[#d5c1af]">{formConfig.description}</p>
            </div>
          </div>
        </div>
      ) : null}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {!isArticle ? (
          <div className="mb-8 flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href={backHref}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{formConfig.title}</h1>
              <p className="text-sm text-muted-foreground">{formConfig.description}</p>
            </div>
          </div>
        ) : null}

        <div
          className={
            isArticle
              ? `overflow-hidden rounded-[2rem] p-8 shadow-[0_28px_90px_rgba(69,38,20,0.1)] sm:p-10 ${editorialTheme.paperPanel}`
              : "rounded-3xl border border-border bg-card p-8 shadow-sm"
          }
        >
          <div className="flex flex-wrap gap-2">
            {isArticle ? (
              <>
                <span className={editorialTheme.badge}>{taskConfig.label}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d0bcaa] bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5a4d]">
                  Local only
                </span>
              </>
            ) : (
              <>
                <Badge variant="secondary">{taskConfig.label}</Badge>
                <Badge variant="outline">Local-only</Badge>
              </>
            )}
          </div>

          <div className="mt-6 grid gap-6">
            {formConfig.fields.map((field) => (
              <div key={field.key} className="grid gap-2">
                <Label className={isArticle ? "text-[#4a3b33]" : undefined}>
                  {field.label} {field.required ? <span className="text-red-500">*</span> : null}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    rows={field.key === "description" && isArticle ? 10 : 4}
                    placeholder={field.placeholder}
                    value={values[field.key] || ""}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                    className={fieldClass()}
                  />
                ) : field.type === "category" ? (
                  <select
                    value={values[field.key] || ""}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                    className={fieldClass(
                      "h-11 rounded-lg px-3 text-sm focus-visible:outline-none"
                    )}
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : field.type === "file" ? (
                  <div className="grid gap-3">
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        if (file.type !== "application/pdf") {
                          toast({
                            title: "Invalid file",
                            description: "Please upload a PDF file.",
                          });
                          return;
                        }
                        const reader = new FileReader();
                        setUploadingPdf(true);
                        reader.onload = () => {
                          const result = typeof reader.result === "string" ? reader.result : "";
                          updateValue(field.key, result);
                          setUploadingPdf(false);
                          toast({
                            title: "PDF uploaded",
                            description: "File is stored locally.",
                          });
                        };
                        reader.readAsDataURL(file);
                      }}
                      className={fieldClass()}
                    />
                    <Input
                      type="text"
                      placeholder="Or paste a PDF URL"
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={fieldClass("h-11")}
                    />
                    {uploadingPdf ? (
                      <p className={`text-xs ${isArticle ? "text-[#7b6456]" : "text-muted-foreground"}`}>
                        Uploading PDF…
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    placeholder={
                      field.type === "images" || field.type === "tags" || field.type === "highlights"
                        ? "Separate values with commas"
                        : field.placeholder
                    }
                    value={values[field.key] || ""}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                    className={fieldClass("h-11")}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={handleSubmit}
              className={isArticle ? `rounded-full px-6 font-semibold ${editorialTheme.copperButton}` : undefined}
            >
              <Save className="mr-2 h-4 w-4" />
              Save locally
            </Button>
            <Button
              variant="ghost"
              asChild
              className={isArticle ? `rounded-full border font-semibold ${editorialTheme.inkButton}` : undefined}
            >
              <Link href={taskConfig.route}>
                View {taskConfig.label}
                <Plus className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      {isArticle ? <Footer /> : null}
    </div>
  );
}
