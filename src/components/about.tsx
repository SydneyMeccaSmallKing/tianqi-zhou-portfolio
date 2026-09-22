import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, Reveal, Stagger } from "./reveal";
import { Mascot } from "./mascot";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm text-muted">{t.aboutEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            {t.aboutTitle}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {t.cities.map((city, i) => (
            <Reveal key={city.id} delay={i * 0.08}>
              <figure className="group relative overflow-hidden rounded-lg">
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-80"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-bg/90 via-bg/30 to-transparent p-5">
                  <span className="font-display text-3xl font-semibold tracking-tight">
                    {city.name}
                  </span>
                  <span className="text-sm text-muted">{city.caption}</span>
                </figcaption>
                {i === 1 ? (
                  <Mascot
                    pose="peek"
                    className="absolute -right-2 bottom-8 h-28 opacity-90 transition-transform duration-300 group-hover:-translate-x-2 group-hover:scale-105 md:h-36"
                  />
                ) : null}
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 max-w-3xl space-y-4">
          {t.aboutParas.map((p, i) => (
            <p
              key={p.slice(0, 24)}
              className={
                i === 0
                  ? "text-lg leading-[1.7] text-fg/90 md:text-xl"
                  : "leading-[1.7] text-muted"
              }
            >
              {p}
            </p>
          ))}
        </div>

        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {t.stats.map((s) => (
            <motion.div key={s.v} variants={fadeUp}>
              <p className="font-display text-3xl font-semibold tracking-[-0.03em]">{s.k}</p>
              <p className="mt-1 text-sm text-muted">{s.v}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
