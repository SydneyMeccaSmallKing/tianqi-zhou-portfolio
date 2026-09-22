import { useState } from "react";
import { ArrowUpRight, Copy, Download, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LINKS } from "@/lib/profile";
import { Magnetic } from "./magnetic";
import { Mascot, MascotGif } from "./mascot";
import { Reveal } from "./reveal";

export function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contact" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-sm text-muted">{t.contactEyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,4.2rem)] font-semibold leading-[1.12] tracking-[-0.035em]">
              {t.contactTitle}
            </h2>
            <p className="mt-5 max-w-xl text-muted">{t.contactLead}</p>
          </Reveal>
          <MascotGif kind="wave" className="mb-2 hidden h-28 w-auto shrink-0 md:block" />
        </div>
        <Reveal delay={0.12} className="mt-10">
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-on-primary transition-transform duration-150 active:scale-[0.96]"
              >
                <Mail className="h-4 w-4" />
                {LINKS.email}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-5 text-sm text-fg transition-colors duration-150 hover:bg-fg/10 active:scale-[0.96]"
            >
              <Copy className="h-4 w-4" />
              {copied ? t.copied : t.copyEmail}
            </button>
            <a
              href={LINKS.resume}
              download
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm text-muted transition-colors hover:text-fg"
            >
              <Download className="h-4 w-4" />
              {t.ctaResume}
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm text-muted transition-colors hover:text-fg"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm text-muted transition-colors hover:text-fg"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <Mascot
            pose="sign"
            interactive={false}
            className="pointer-events-none mt-3 h-24 w-auto origin-top md:h-28"
          />
        </Reveal>
        <p className="mt-16 text-sm text-subtle">{t.footer}</p>
      </div>
    </section>
  );
}
