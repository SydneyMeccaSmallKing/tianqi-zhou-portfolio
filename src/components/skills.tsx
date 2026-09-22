import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, Reveal, Stagger } from "./reveal";

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm text-muted">{t.skillsEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            {t.skillsTitle}
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-10 md:grid-cols-3">
          {t.skillGroups.map((g) => (
            <motion.div key={g.name} variants={fadeUp}>
              <h3 className="font-display text-sm font-semibold tracking-[-0.01em] text-fg">
                {g.name}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 font-display text-[13px] font-medium tracking-[-0.01em] text-muted transition-colors duration-150 hover:border-fg/40 hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Stagger>

        <Reveal className="mt-20" delay={0.1}>
          <p className="text-sm text-muted">{t.eduEyebrow}</p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.025em]">
            {t.eduTitle}
          </h3>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {t.education.map((ed) => (
              <div
                key={ed.school}
                className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  {"logo" in ed && ed.logo ? (
                    <img
                      src={ed.logo}
                      alt=""
                      className={
                        ed.logo.includes("kmust")
                          ? "h-11 w-auto shrink-0 rounded-md bg-white p-0.5"
                          : "h-10 w-auto shrink-0 md:h-11"
                      }
                    />
                  ) : null}
                  <div>
                    <p className="font-display text-xl font-medium tracking-tight">{ed.school}</p>
                    <p className="text-sm text-muted">{ed.degree}</p>
                  </div>
                </div>
                <p className="font-display text-sm font-medium text-subtle">{ed.period}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
