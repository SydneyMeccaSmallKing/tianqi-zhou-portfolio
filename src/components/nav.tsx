import { Download, Github, Linkedin, Moon, Snowflake } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LINKS, type Lang } from "@/lib/profile";
import { useTheme, type Theme } from "@/lib/theme";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

const LANGS: { id: Lang; label: string }[] = [
  { id: "zh", label: "中" },
  { id: "en", label: "EN" },
  { id: "ja", label: "日" },
];

export function Nav({ progress }: { progress: number }) {
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();

  const items = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ];

  const scenes: { id: Theme; label: string; icon: typeof Moon }[] = [
    { id: "night", label: t.sceneNight, icon: Moon },
    { id: "snow", label: t.sceneSnow, icon: Snowflake },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-border bg-bg/95 backdrop-blur-md max-md:backdrop-blur-none">
        <div
          className="h-px origin-left bg-primary"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5 md:py-3">
          <a href="#top" className="flex items-center gap-2">
            <img
              src="/media/avatar.png"
              alt="TZ"
              className="h-8 w-8 rounded-full object-cover ring-1 ring-border md:h-9 md:w-9"
            />
          </a>
          <nav className="hidden items-center gap-0.5 md:flex">
            {items.map((item) => (
              <Magnetic key={item.href} strength={8}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:text-fg"
                >
                  {item.label}
                </a>
              </Magnetic>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1">
            <div className="mr-1 flex rounded-full border border-border bg-bg p-0.5">
              {scenes.map((s) => {
                const Icon = s.icon;
                const on = theme === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setTheme(s.id)}
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium transition-colors duration-150",
                      on ? "bg-primary text-on-primary" : "text-muted hover:text-fg",
                    )}
                    aria-pressed={on}
                    aria-label={s.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <a
              href={LINKS.resume}
              download
              className="hidden h-10 items-center gap-1.5 px-2 text-xs text-muted transition-colors hover:text-fg lg:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              {t.ctaResume}
            </a>
            <div className="flex rounded-full border border-border bg-bg p-0.5">
              {LANGS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLang(item.id)}
                  className={cn(
                    "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[11px] font-medium transition-colors duration-150",
                    lang === item.id ? "bg-primary text-on-primary" : "text-muted hover:text-fg",
                  )}
                  aria-pressed={lang === item.id}
                  aria-label={item.label}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-fg"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-fg"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        <nav className="hide-scrollbar flex gap-1 overflow-x-auto bg-bg px-4 pb-2.5 md:hidden">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
