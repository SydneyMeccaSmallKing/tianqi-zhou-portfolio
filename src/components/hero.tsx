import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LINKS } from "@/lib/profile";
import { useTheme } from "@/lib/theme";
import { Magnetic } from "./magnetic";
import { Mascot, MascotGif } from "./mascot";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const night = theme === "night";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-start overflow-x-hidden px-5 pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <video
          key={theme}
          className="h-full w-full object-cover"
          style={{ opacity: night ? 0.58 : 0.55 }}
          autoPlay
          muted
          loop
          playsInline
          poster={night ? "/media/hero-solar.jpg" : "/media/hero-fuji.jpg"}
        >
          <source
            src={night ? "/media/hero-solar.mp4" : "/media/hero-fuji.mp4"}
            type="video/mp4"
          />
        </video>
      </div>
      <div
        className={
          night
            ? "absolute inset-0 -z-10 bg-linear-to-b from-bg/30 via-bg/75 to-bg"
            : "absolute inset-0 -z-10 bg-linear-to-b from-bg/20 via-bg/75 to-bg"
        }
      />
      <div className="noise pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease }}
            className="font-display text-xs font-medium tracking-[0.08em] text-muted uppercase"
          >
            {t.heroKicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-4 font-display text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.08] font-[650] tracking-[-0.04em]"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease }}
            className="mt-6 text-lg leading-relaxed text-fg md:text-xl"
          >
            {t.heroLead}
          </motion.p>
          {t.heroBody.map((p) => (
            <motion.p
              key={p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46, ease }}
              className="mt-4 text-base leading-[1.7] text-muted"
            >
              {p}
            </motion.p>
          ))}
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.56, ease }}
            className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-display text-[11px] font-medium tracking-[-0.01em] text-subtle uppercase"
          >
            {t.proof.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? <span className="text-border-strong">·</span> : null}
                {item}
              </li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68, ease }}
            className="mt-8 flex flex-wrap items-end gap-3"
          >
            <div className="flex items-end">
              <Magnetic>
                <a
                  href="#projects"
                  className="relative z-[1] inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-on-primary transition-transform duration-150 active:scale-[0.96]"
                >
                  {t.ctaPrimary}
                </a>
              </Magnetic>
              <Mascot
                pose="hug"
                interactive={false}
                className="pointer-events-none -ml-3 h-[4.25rem] w-auto origin-bottom md:h-[4.75rem]"
              />
            </div>
            <div className="flex items-end">
              <Magnetic>
                <a
                  href="#contact"
                  className="relative z-[1] inline-flex h-12 items-center rounded-full border border-border-strong px-6 text-sm text-fg transition-colors duration-150 hover:bg-fg/10 active:scale-[0.96]"
                >
                  {t.ctaSecondary}
                </a>
              </Magnetic>
              <Mascot
                pose="sign"
                interactive={false}
                className="pointer-events-none -ml-2 h-[4.25rem] w-auto origin-bottom md:h-[4.75rem]"
              />
            </div>
            <a
              href={LINKS.resume}
              download
              className="inline-flex h-12 items-center gap-2 px-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <Download className="h-3.5 w-3.5" />
              {t.ctaResume}
            </a>
          </motion.div>
        </div>

        <motion.a
          href={t.featuredHref}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease }}
          className="group relative md:col-span-6"
        >
          <div className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
            <img
              src="/media/shot-wil.png"
              alt="WIL AI Assistant"
              className="aspect-16/10 w-full object-cover object-top"
            />
          </div>
          <Mascot
            pose="peek"
            className="absolute -right-3 -bottom-6 z-10 hidden h-28 md:block md:h-32"
          />
          <p className="mt-3 flex items-center gap-1.5 font-display text-xs font-medium tracking-[-0.01em] text-muted group-hover:text-fg">
            {t.featuredLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </p>
        </motion.a>
      </div>

      <a
        href="#about"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center text-sm text-subtle md:flex"
      >
        <MascotGif kind="wave" className="h-16 w-auto" />
        <span className="mt-1 inline-flex items-center gap-1">
          {t.scroll}
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </span>
      </a>
    </section>
  );
}
