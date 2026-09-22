import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, Reveal, Stagger } from "./reveal";
import { TiltCard } from "./tilt-card";

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm text-muted">{t.projectsEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            {t.projectsTitle}
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {t.projects.map((p, i) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface/50 transition-colors duration-200 hover:border-border-strong">
                  <div className={`relative overflow-hidden ${i === 0 ? "h-56 md:h-80" : "h-44 md:h-52"}`}>
                    <img
                      src={p.image}
                      alt=""
                      className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                        p.id === "industry" ? "object-center" : "object-top"
                      }`}
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-bg/70 px-3 py-1 font-display text-xs font-medium text-fg backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <dl className="mt-4 space-y-2.5 text-[14px] leading-relaxed">
                      <div>
                        <dt className="font-display text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">
                          {t.problem}
                        </dt>
                        <dd className="mt-0.5 text-muted">{p.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-display text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">
                          {t.built}
                        </dt>
                        <dd className="mt-0.5 text-muted">{p.built}</dd>
                      </div>
                      <div>
                        <dt className="font-display text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">
                          {t.result}
                        </dt>
                        <dd className="mt-0.5 text-fg/90">{p.result}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 font-display text-xs font-medium tracking-[-0.01em] text-subtle">
                      {p.meta}
                    </p>
                    {"links" in p && p.links ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 font-display text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-fg"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
