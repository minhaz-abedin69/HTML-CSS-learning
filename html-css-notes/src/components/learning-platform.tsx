import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Code2,
  Copy,
  ExternalLink,
  FileCode2,
  Github,
  Instagram,
  Linkedin,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Sun,
  TerminalSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  createPreviewDocument,
  lessons,
  tracks,
  type Lesson,
  type Track,
} from "@/lib/lessons";
import { cn } from "@/lib/utils";

type View = "home" | "lesson" | "playground";

const starterHtml = `<main class="profile-card">
  <span class="status">Learning in public</span>
  <h1>Hello, developer.</h1>
  <p>Edit this code and watch your idea come alive.</p>
  <button>Explore the web</button>
</main>`;

const starterCss = `body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: #ecfeff;
  font-family: system-ui;
}
.profile-card {
  width: min(100%, 420px);
  padding: 2rem;
  border: 1px solid #a5f3fc;
  border-radius: 16px;
  background: white;
  box-shadow: 0 20px 50px #155e7520;
}
.status { color: #0e7490; font-weight: 700; }
h1 { margin-bottom: .5rem; }
p { color: #475569; line-height: 1.6; }
button { border: 0; border-radius: 8px; padding: .8rem 1rem; background: #0e7490; color: white; font-weight: 700; }`;

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) {
      try {
        setValue(JSON.parse(stored) as T);
      } catch {
        /* ignore invalid older data */
      }
    }
  }, [key]);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="brand-mark shrink-0" aria-hidden="true">
        <span>&lt;/&gt;</span>
      </div>
      {!compact && (
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-foreground">
            Interactive Notes
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            HTML + CSS field guide
          </p>
        </div>
      )}
    </div>
  );
}

function IconTip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="code-shell">
      <div className="code-head">
        <span>{title}</span>
        <IconTip label={copied ? "Copied" : "Copy code"}>
          <Button
            variant="ghost"
            size="icon"
            onClick={copy}
            aria-label={`Copy ${title}`}
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </IconTip>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function LessonPreview({ lesson }: { lesson: Lesson }) {
  const [html, setHtml] = useState(lesson.html);
  const [css, setCss] = useState(lesson.css);
  useEffect(() => {
    setHtml(lesson.html);
    setCss(lesson.css);
  }, [lesson]);
  return (
    <div className="preview-shell">
      <div className="preview-head">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Live output</span>
        <span className="live-label">
          <i /> Rendered
        </span>
      </div>
      <iframe
        title={`${lesson.title} rendered example`}
        srcDoc={createPreviewDocument(html, css)}
        sandbox="allow-scripts"
      />
      <details className="try-editor">
        <summary>
          <Code2 /> Try it yourself <ChevronDown />
        </summary>
        <div>
          <label>
            HTML
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
            />
          </label>
          <label>
            CSS
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              spellCheck={false}
            />
          </label>
        </div>
      </details>
    </div>
  );
}

function SidebarContent({
  activeId,
  completed,
  onSelect,
  close,
}: {
  activeId: string | undefined;
  completed: string[];
  onSelect: (id: string) => void;
  close?: () => void;
}) {
  const grouped = (["html", "css"] as Track[]).map((track) => ({
    track,
    categories: Array.from(
      new Set(lessons.filter((l) => l.track === track).map((l) => l.category)),
    ),
  }));
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-5">
        <Brand />
      </div>
      <div className="sidebar-scroll">
        {grouped.map(({ track, categories }) => (
          <div key={track} className="mb-6">
            <div className="mb-2 flex items-center justify-between px-3">
              <span
                className={cn(
                  "track-kicker",
                  track === "html" ? "text-html" : "text-css",
                )}
              >
                {track === "html" ? "<>" : "#"} {tracks[track].name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {lessons.filter((l) => l.track === track).length}
              </span>
            </div>
            {categories.map((category) => (
              <details key={category} open className="group/category">
                <summary className="category-summary">
                  <span>{category}</span>
                  <ChevronDown />
                </summary>
                <div className="space-y-1 pb-2">
                  {lessons
                    .filter((l) => l.track === track && l.category === category)
                    .map((lesson) => (
                      <button
                        key={lesson.id}
                        className={cn(
                          "lesson-link",
                          activeId === lesson.id && "lesson-link-active",
                          track === "html" ? "lesson-html" : "lesson-css",
                        )}
                        onClick={() => {
                          onSelect(lesson.id);
                          close?.();
                        }}
                      >
                        {completed.includes(lesson.id) ? (
                          <CheckCircle2 className="text-success" />
                        ) : (
                          <Circle />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    ))}
                </div>
              </details>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold">Course progress</span>
          <span className="text-muted-foreground">
            {completed.length}/{lessons.length}
          </span>
        </div>
        <Progress value={(completed.length / lessons.length) * 100} />
        <div className="credit-line">
          <Sparkles />
          <span>
            Made by <strong>Minhaz Abedin</strong> · CSE, IIUC
          </span>
        </div>
      </div>
    </div>
  );
}

function Home({
  completed,
  openTrack,
  openPlayground,
}: {
  completed: string[];
  openTrack: (track: Track) => void;
  openPlayground: () => void;
}) {
  const percent = Math.round((completed.length / lessons.length) * 100);
  return (
    <div className="home-view">
      <section className="hero-section">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles /> Learn by seeing and doing
          </div>
          <h1>
            HTML &amp; CSS
            <br />
          </h1>
          <p>
            Learn HTML tags and CSS properties with interactive examples, live
            previews, and visual explanations.
          </p>
          <div className="hero-actions">
            <Button
              size="lg"
              className="html-action"
              onClick={() => openTrack("html")}
            >
              <FileCode2 /> Explore HTML
            </Button>
            <Button
              size="lg"
              className="css-action"
              onClick={() => openTrack("css")}
            >
              <Code2 /> Explore CSS
            </Button>
            <Button size="lg" variant="outline" onClick={openPlayground}>
              <Play /> Open Playground
            </Button>
          </div>
          <div className="hero-stats">
            <span>
              <strong>{lessons.length}</strong> guided lessons
            </span>
            <i />
            <span>
              <strong>Live</strong> code output
            </span>
            <i />
            <span>
              <strong>Saved</strong> progress
            </span>
          </div>
        </div>
        <div
          className="code-illustration"
          aria-label="Animated HTML and CSS code example"
        >
          <div className="illustration-bar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>index.html</span>
            <span className="typing-status">● live</span>
          </div>
          <div className="illustration-code">
            <div>
              <b>01</b>
              <span className="token-blue">&lt;article</span>{" "}
              <span className="token-gold">class</span>=
              <span className="token-green">&quot;note&quot;</span>
              <span className="token-blue">&gt;</span>
            </div>
            <div>
              <b>02</b>&nbsp;&nbsp;
              <span className="token-blue">&lt;h1&gt;</span>Hello, CSS!
              <span className="token-blue">&lt;/h1&gt;</span>
            </div>
            <div>
              <b>03</b>&nbsp;&nbsp;<span className="token-blue">&lt;p&gt;</span>
              Make ideas visible.<span className="token-blue">&lt;/p&gt;</span>
            </div>
            <div>
              <b>04</b>
              <span className="token-blue">&lt;/article&gt;</span>
            </div>
            <div className="code-divider" />
            <div>
              <b>05</b>
              <span className="token-gold">.note</span> <span>{"{"}</span>
            </div>
            <div>
              <b>06</b>&nbsp;&nbsp;<span className="token-blue">display</span>:
              grid;
            </div>
            <div>
              <b>07</b>&nbsp;&nbsp;<span className="token-blue">gap</span>:{" "}
              <span className="token-green">1rem</span>;
            </div>
            <div>
              <b>08</b>
              <span>{"}"}</span>
              <i className="code-caret" />
            </div>
          </div>
          <div className="illustration-output">
            <span>OUTPUT</span>
            <strong>Hello, CSS!</strong>
            <p>Make ideas visible.</p>
          </div>
        </div>
      </section>

      <section className="dashboard-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow-label">YOUR LEARNING MAP</span>
            <h2>Everything important, organized.</h2>
          </div>
          <p>Move from structure to style with focused, visual lessons.</p>
        </div>
        <div className="track-grid">
          {(["html", "css"] as Track[]).map((track) => {
            const trackLessons = lessons.filter((l) => l.track === track);
            const done = trackLessons.filter((l) =>
              completed.includes(l.id),
            ).length;
            return (
              <button
                key={track}
                className={cn("track-card", `track-${track}`)}
                onClick={() => openTrack(track)}
              >
                <div className="track-icon">
                  {track === "html" ? "<>" : "#"}
                </div>
                <div className="min-w-0">
                  <span className="track-kicker">
                    {track === "html"
                      ? "THE STRUCTURE LAYER"
                      : "THE STYLE LAYER"}
                  </span>
                  <h3>{tracks[track].name}</h3>
                  <p>{tracks[track].description}</p>
                  <div className="topic-list">
                    {Array.from(new Set(trackLessons.map((l) => l.category)))
                      .slice(0, 4)
                      .map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                  </div>
                </div>
                <div className="track-progress">
                  <span>
                    {done}/{trackLessons.length} complete
                  </span>
                  <Progress value={(done / trackLessons.length) * 100} />
                </div>
                <ArrowRight className="track-arrow" />
              </button>
            );
          })}
          <div className="progress-card">
            <div
              className="progress-ring"
              style={
                { "--progress": `${percent * 3.6}deg` } as React.CSSProperties
              }
            >
              <div>
                <strong>{percent}%</strong>
                <span>complete</span>
              </div>
            </div>
            <div>
              <span className="eyebrow-label">YOUR PROGRESS</span>
              <h3>
                {completed.length === 0
                  ? "Ready when you are."
                  : "Keep the momentum."}
              </h3>
              <p>Your completed lessons are stored on this device.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LessonView({
  lesson,
  completed,
  toggleComplete,
  navigateLesson,
}: {
  lesson: Lesson;
  completed: boolean;
  toggleComplete: () => void;
  navigateLesson: (id: string) => void;
}) {
  const index = lessons.findIndex((l) => l.id === lesson.id);
  return (
    <article className="lesson-view">
      <header className="lesson-header">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "lesson-track-badge",
              lesson.track === "html" ? "badge-html" : "badge-css",
            )}
          >
            {lesson.track}
          </span>
          <span className="text-xs text-muted-foreground">
            {lesson.category} · Lesson {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
        <Button
          variant={completed ? "secondary" : "outline"}
          onClick={toggleComplete}
        >
          {completed ? <CheckCircle2 /> : <Circle />}
          {completed ? "Completed" : "Mark complete"}
        </Button>
      </header>
      <div className="lesson-body">
        <section>
          <span className="section-number">01 / CONCEPT</span>
          <h2>What it does</h2>
          <p className="lead-copy">{lesson.explanation}</p>
          <div className="note-callout">
            <BookOpen />
            <div>
              <strong>Beginner note</strong>
              <p>{lesson.note}</p>
            </div>
          </div>
        </section>
        <section>
          <span className="section-number">02 / SYNTAX</span>
          <h2>The pattern</h2>
          <CodeBlock code={lesson.syntax} title="Syntax" />
        </section>
        <section>
          <span className="section-number">03 / EXAMPLE</span>
          <h2>See it in context</h2>
          <div className="example-grid">
            <div className="space-y-4">
              <CodeBlock code={lesson.html} title="HTML" />
              <CodeBlock code={lesson.css} title="CSS" />
            </div>
            <LessonPreview lesson={lesson} />
          </div>
        </section>
        {lesson.attributes && (
          <section>
            <span className="section-number">
              04 /{" "}
              {lesson.track === "html"
                ? "IMPORTANT ATTRIBUTES"
                : "COMMON VALUES"}
            </span>
            <h2>
              {lesson.track === "html"
                ? "Know the useful controls"
                : "Values to explore"}
            </h2>
            <div className="attribute-grid">
              {lesson.attributes.map((item) => {
                const [name, detail] = item.split(" — ");
                return (
                  <div key={item}>
                    <code>{name}</code>
                    <p>{detail ?? "A commonly used option."}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <section className="property-strip">
          <div>
            <span className="section-number">KEYWORDS TO REMEMBER</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {lesson.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          {lesson.related && (
            <div>
              <span className="section-number">RELATED</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.related.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
      <footer className="lesson-footer">
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => navigateLesson(lessons[index - 1]?.id ?? lesson.id)}
        >
          <ArrowLeft /> Previous
        </Button>
        <span>
          {index + 1} of {lessons.length}
        </span>
        <Button
          variant="outline"
          disabled={index === lessons.length - 1}
          onClick={() => navigateLesson(lessons[index + 1]?.id ?? lesson.id)}
        >
          Next <ArrowRight />
        </Button>
      </footer>
    </article>
  );
}

function Playground() {
  const [html, setHtml] = useState(starterHtml);
  const [css, setCss] = useState(starterCss);
  const [copied, setCopied] = useState<"html" | "css" | null>(null);
  const copy = async (kind: "html" | "css") => {
    await navigator.clipboard.writeText(kind === "html" ? html : css);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1400);
  };
  return (
    <div className="playground-view">
      <header className="playground-header">
        <div>
          <span className="eyebrow-label">CODE PLAYGROUND</span>
          <h1>Make it. Break it. Learn it.</h1>
          <p>Edit either pane—the output updates instantly.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setHtml(starterHtml);
            setCss(starterCss);
          }}
        >
          <RotateCcw /> Reset
        </Button>
      </header>
      <div className="editor-grid">
        <section className="editor-panel">
          <div className="editor-head">
            <span>
              <FileCode2 className="text-html" /> HTML
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copy("html")}
              aria-label="Copy HTML"
            >
              {copied === "html" ? <Check /> : <Copy />}
            </Button>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            spellCheck={false}
            aria-label="HTML editor"
          />
        </section>
        <section className="editor-panel">
          <div className="editor-head">
            <span>
              <Code2 className="text-css" /> CSS
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copy("css")}
              aria-label="Copy CSS"
            >
              {copied === "css" ? <Check /> : <Copy />}
            </Button>
          </div>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            spellCheck={false}
            aria-label="CSS editor"
          />
        </section>
        <section className="result-panel">
          <div className="editor-head">
            <span>
              <ExternalLink className="text-success" /> Preview
            </span>
            <span className="live-label">
              <i /> Live
            </span>
          </div>
          <iframe
            title="Playground preview"
            sandbox="allow-scripts"
            srcDoc={createPreviewDocument(html, css)}
          />
        </section>
      </div>
    </div>
  );
}

type SocialId = "github" | "linkedin" | "instagram";
type SocialLinks = Record<SocialId, string>;

const defaultSocialLinks: SocialLinks = {
  github: "https://github.com/minhaz-abedin69",
  linkedin: "https://www.linkedin.com/in/minhaz-abedin-a8294639b",
  instagram: "https://www.instagram.com/_minhaz_abedin_",
};

const socialMeta: {
  id: SocialId;
  label: string;
  icon: typeof Github;
  placeholder: string;
}[] = [
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/username",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "https://www.instagram.com/username",
  },
];

function isValidProfileUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function SettingsPanel({
  links,
  onSave,
  onClose,
}: {
  links: SocialLinks;
  onSave: (next: SocialLinks) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<SocialLinks>(links);
  const [errors, setErrors] = useState<Partial<SocialLinks>>({});
  const save = () => {
    const nextErrors: Partial<SocialLinks> = {};
    for (const { id } of socialMeta) {
      if (!isValidProfileUrl(draft[id].trim()))
        nextErrors[id] = "Enter a full URL starting with https://";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSave({
        github: draft.github.trim(),
        linkedin: draft.linkedin.trim(),
        instagram: draft.instagram.trim(),
      });
      onClose();
    }
  };
  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Profile link settings"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div className="search-dialog settings-dialog">
        <div className="search-input">
          <Settings />
          <span className="settings-title">Profile links</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close settings"
          >
            <X />
          </Button>
        </div>
        <div className="settings-body">
          <p className="settings-hint">
            These URLs power the social buttons in your credit card. They are
            saved in this browser only.
          </p>
          {socialMeta.map(({ id, label, icon: Icon, placeholder }) => (
            <label key={id} className="settings-field">
              <span>
                <Icon aria-hidden="true" /> {label}
              </span>
              <input
                value={draft[id]}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [id]: e.target.value }))
                }
                placeholder={placeholder}
                inputMode="url"
                spellCheck={false}
                aria-invalid={Boolean(errors[id])}
              />
              {errors[id] && (
                <small className="settings-error">{errors[id]}</small>
              )}
            </label>
          ))}
        </div>
        <div className="settings-actions">
          <Button
            variant="ghost"
            onClick={() => {
              setDraft(defaultSocialLinks);
              setErrors({});
            }}
          >
            <RotateCcw /> Reset to defaults
          </Button>
          <Button onClick={save}>
            <Check /> Save links
          </Button>
        </div>
      </div>
    </div>
  );
}

function SiteFooter({
  links,
  onCustomize,
}: {
  links: SocialLinks;
  onCustomize: () => void;
}) {
  return (
    <footer className="site-footer">
      <div className="credit-card">
        <div className="credit-avatar" aria-hidden="true">
          MA
        </div>
        <div className="credit-copy">
          <span className="eyebrow-label">Designed &amp; built by</span>
          <strong>Minhaz Abedin</strong>
          <p>
            Student of <b>CSE</b> at <b>IIUC</b> — these notes are part of
            learning HTML and CSS in public.
          </p>
        </div>
        <div className="credit-links">
          {socialMeta.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              className={`credit-link credit-link--${id}`}
              href={links[id]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Minhaz Abedin on ${label} in a new tab`}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="credit-meta">
          <span>HTML &amp; CSS Interactive Notes</span>
          <span>Learn by building</span>
          <button className="credit-edit" onClick={onCustomize}>
            <Settings aria-hidden="true" /> Edit profile links
          </button>
        </div>
      </div>
    </footer>
  );
}

export function LearningPlatform() {
  const [view, setView] = useState<View>("home");
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useStoredState<string[]>(
    "interactive-notes-progress",
    [],
  );
  const [theme, setTheme] = useStoredState<"dark" | "light">(
    "interactive-notes-theme",
    "dark",
  );
  const [socialLinks, setSocialLinks] = useStoredState<SocialLinks>(
    "interactive-notes-socials",
    defaultSocialLinks,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const activeLesson = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return lessons.slice(0, 7);
    return lessons
      .filter((l) =>
        [l.title, l.summary, l.category, ...l.tags]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 9);
  }, [query]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get("lesson");
    const page = params.get("view");
    if (lessonId && lessons.some((l) => l.id === lessonId)) {
      setActiveId(lessonId);
      setView("lesson");
    } else if (page === "playground") setView("playground");
  }, []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const syncUrl = (nextView: View, lessonId?: string) => {
    const params = new URLSearchParams();
    if (nextView === "lesson" && lessonId) params.set("lesson", lessonId);
    if (nextView === "playground") params.set("view", "playground");
    window.history.pushState({}, "", params.size ? `/?${params}` : "/");
  };
  const openLesson = (id: string) => {
    setActiveId(id);
    setView("lesson");
    syncUrl("lesson", id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openHome = () => {
    setView("home");
    syncUrl("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openPlayground = () => {
    setView("playground");
    syncUrl("playground");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openTrack = (track: Track) => {
    const first = lessons.find((l) => l.track === track);
    if (first) openLesson(first.id);
  };
  const toggleComplete = () =>
    setCompleted((items) =>
      items.includes(activeId)
        ? items.filter((id) => id !== activeId)
        : [...items, activeId],
    );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="app-shell">
        <header className="topbar">
          <div className="flex min-w-0 items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open lessons"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-[320px] p-0">
                <SheetTitle className="sr-only">Lessons</SheetTitle>
                <SidebarContent
                  activeId={view === "lesson" ? activeId : undefined}
                  completed={completed}
                  onSelect={openLesson}
                  close={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              className="h-10 px-2"
              onClick={openHome}
              aria-label="Open home"
            >
              <Brand compact />
            </Button>
            <button className="brand-name" onClick={openHome}>
              HTML <span>&amp;</span> CSS <b>NOTES</b>
            </button>
          </div>
          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
            <span>Search tags, properties, concepts…</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className="flex items-center justify-end gap-1">
            <Button
              variant={view === "playground" ? "secondary" : "ghost"}
              onClick={openPlayground}
              className="hidden sm:inline-flex"
            >
              <TerminalSquare /> Playground
            </Button>
            <IconTip label="Profile link settings">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                aria-label="Open profile link settings"
              >
                <Settings />
              </Button>
            </IconTip>
            <IconTip
              label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
            </IconTip>
          </div>
        </header>
        <div className={cn("workspace", !sidebarOpen && "sidebar-collapsed")}>
          <aside className="desktop-sidebar">
            <SidebarContent
              activeId={view === "lesson" ? activeId : undefined}
              completed={completed}
              onSelect={openLesson}
            />
          </aside>
          <main className="main-stage">
            <IconTip
              label={sidebarOpen ? "Collapse lessons" : "Expand lessons"}
            >
              <Button
                variant="secondary"
                size="icon"
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle lesson sidebar"
              >
                {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
              </Button>
            </IconTip>
            {view === "home" && (
              <Home
                completed={completed}
                openTrack={openTrack}
                openPlayground={openPlayground}
              />
            )}
            {view === "lesson" && activeLesson && (
              <LessonView
                lesson={activeLesson}
                completed={completed.includes(activeLesson.id)}
                toggleComplete={toggleComplete}
                navigateLesson={openLesson}
              />
            )}
            {view === "playground" && <Playground />}
          </main>
        </div>
        <SiteFooter
          links={socialLinks}
          onCustomize={() => setSettingsOpen(true)}
        />
        {settingsOpen && (
          <SettingsPanel
            links={socialLinks}
            onSave={setSocialLinks}
            onClose={() => setSettingsOpen(false)}
          />
        )}
        {searchOpen && (
          <div
            className="search-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Search lessons"
            onMouseDown={(e) => {
              if (e.currentTarget === e.target) setSearchOpen(false);
            }}
          >
            <div className="search-dialog">
              <div className="search-input">
                <Search />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “flexbox”, “forms”, or “animation”"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X />
                </Button>
              </div>
              <div className="search-results">
                <span className="search-label">
                  {query ? `${results.length} RESULTS` : "QUICK PICKS"}
                </span>
                {results.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      openLesson(lesson.id);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <span
                      className={cn(
                        "result-icon",
                        lesson.track === "html" ? "badge-html" : "badge-css",
                      )}
                    >
                      {lesson.track === "html" ? "<>" : "#"}
                    </span>
                    <span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.summary}</small>
                    </span>
                    <ArrowRight />
                  </button>
                ))}
                {results.length === 0 && (
                  <p className="empty-search">
                    No lessons match that search yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
