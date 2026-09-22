import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, Reveal, Stagger } from "./reveal";

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="work" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm text-muted">{t.workEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            {t.workTitle}
          </h2>
        </Reveal>
        <Stagger className="mt-12 space-y-10">
          {t.roles.map((role) => (
            <motion.article
              key={role.org}
              variants={fadeUp}
              className="border-t border-border pt-8"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {role.title}
                  </h3>
                  <div className="mt-2.5 flex items-center gap-3">
                    {"logo" in role && role.logo ? (
                      <img
                        src={role.logo}
                        alt=""
                        className="h-7 w-auto shrink-0 md:h-8"
                      />
                    ) : null}
                    <p className="text-sm text-muted">{role.org}</p>
                  </div>
                </div>
                <p className="text-sm text-subtle md:pt-2">
                  {role.period}
                  <span className="mx-2">·</span>
                  {role.place}
                </p>
              </div>
              <div
                className={
                  "image" in role && role.image
                    ? "mt-6 grid gap-6 md:grid-cols-12 md:items-start"
                    : ""
                }
              >
                {"image" in role && role.image ? (
                  <figure className="overflow-hidden rounded-lg md:col-span-5">
                    <img
                      src={role.image}
                      alt=""
                      className="h-48 w-full object-cover md:h-56"
                    />
                  </figure>
                ) : null}
                <ul
                  className={`space-y-3 text-[15px] leading-relaxed text-muted ${
                    "image" in role && role.image
                      ? "md:col-span-7"
                      : "mt-5 max-w-3xl"
                  }`}
                >
                  {role.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
