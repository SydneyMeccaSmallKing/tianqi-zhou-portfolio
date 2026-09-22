import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; s: number };

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.min(220, Math.floor((w * h) / 9000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          s: Math.random(),
        });
      }
    };

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        if (!reduced) {
          star.y += 0.08 + star.z * 0.22;
          if (star.y > h) {
            star.y = 0;
            star.x = Math.random() * w;
          }
        }
        const tw = 0.45 + Math.sin(t * 0.02 + star.s * 12) * 0.35;
        const size = 0.4 + star.z * 1.4;
        ctx.fillStyle = `rgba(232,238,248,${0.18 + star.z * 0.7 * tw})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
        if (star.z > 0.82) {
          ctx.fillStyle = `rgba(245,245,242,${0.14 * tw})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
