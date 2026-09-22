import { motion } from "motion/react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Pose = "hug" | "sign" | "peek" | "sit";

export function Mascot({
  pose,
  className,
  interactive = true,
}: {
  pose: Pose;
  className?: string;
  interactive?: boolean;
}) {
  const { theme } = useTheme();
  const file = pose === "sit" && theme === "snow" ? "snow-peek" : `${theme}-${pose}`;

  return (
    <motion.img
      key={file}
      src={`/media/mascot/${file}.png`}
      alt=""
      draggable={false}
      className={cn("pointer-events-none select-none", className)}
      animate={{ y: [0, -8, 0] }}
      whileHover={interactive ? { scale: 1.08, rotate: -5 } : undefined}
      whileTap={interactive ? { scale: 0.95, rotate: 3 } : undefined}
      transition={{
        y: { duration: 2.7, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.2 },
        rotate: { duration: 0.2 },
      }}
    />
  );
}

export function MascotGif({
  kind = "wave",
  className,
}: {
  kind?: "wave" | "walk";
  className?: string;
}) {
  const { theme } = useTheme();

  return (
    <video
      key={`${theme}-${kind}`}
      src={`/media/mascot/${theme}-${kind}.mp4`}
      autoPlay
      muted
      loop
      playsInline
      className={cn("pointer-events-none select-none bg-bg", className)}
    />
  );
}

export function MascotDivider({ kind }: { kind: "walk" | "wave" }) {
  return (
    <div className="flex items-center justify-center py-2 md:py-4" aria-hidden>
      <MascotGif
        kind={kind}
        className={kind === "walk" ? "h-20 w-auto md:h-28" : "h-24 w-auto md:h-32"}
      />
    </div>
  );
}
