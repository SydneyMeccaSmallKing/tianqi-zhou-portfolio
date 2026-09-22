import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function Intro({ show }: { show: boolean }) {
  const { t } = useI18n();
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-bg"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="px-6 text-center">
            <motion.p
              className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.heroKicker}
            </motion.p>
            <motion.p
              className="mt-3 text-base text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              {t.heroTitle}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
