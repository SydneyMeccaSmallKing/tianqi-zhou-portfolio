import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  kind: "snow" | "petal";
  a: number;
};

type Star = { x: number; y: number; r: number; a: number; tw: number };

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  wait: number;
  a: number;
};

function drawSnowflake(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(0.7, r * 0.18);
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, r);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, r * 0.45);
    ctx.lineTo(-r * 0.22, r * 0.62);
    ctx.moveTo(0, r * 0.45);
    ctx.lineTo(r * 0.22, r * 0.62);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPetal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.55, r, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let mode: "night" | "snow" = themeRef.current;
    const flakes: Flake[] = [];
    const stars: Star[] = [];
    const meteors: Meteor[] = [];

    const spawnFlake = (partial = false): Flake => ({
      x: Math.random() * w,
      y: partial ? Math.random() * h : -12,
      r: Math.random() > 0.78 ? 4 + Math.random() * 5 : 1.2 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 1.15,
      vx: -0.35 + Math.random() * 0.7,
      rot: Math.random() * Math.PI,
      vr: -0.02 + Math.random() * 0.04,
      kind: Math.random() > 0.78 ? "petal" : "snow",
      a: 0.35 + Math.random() * 0.55,
    });

    const spawnMeteor = (delay = true): Meteor => {
      const speed = 9 + Math.random() * 10;
      const angle = Math.PI * (0.18 + Math.random() * 0.16);
      return {
        x: Math.random() * w * 0.9,
        y: -20 - Math.random() * 80,
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        len: 90 + Math.random() * 140,
        life: 0,
        wait: delay ? Math.random() * 220 : Math.random() * 40,
        a: 0.65 + Math.random() * 0.35,
      };
    };

    const rebuild = () => {
      flakes.length = 0;
      stars.length = 0;
      meteors.length = 0;
      if (mode === "night") {
        const n = Math.min(140, Math.floor((w * h) / 16000));
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.3,
            a: 0.25 + Math.random() * 0.6,
            tw: Math.random() * Math.PI * 2,
          });
        }
        const m = 5;
        for (let i = 0; i < m; i++) meteors.push(spawnMeteor(true));
      } else {
        const count = Math.min(160, Math.floor((w * h) / 14000));
        for (let i = 0; i < count; i++) flakes.push(spawnFlake(true));
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
    };

    const drawNight = () => {
      for (const s of stars) {
        s.tw += 0.02;
        const tw = 0.45 + Math.sin(s.tw) * 0.4;
        ctx.fillStyle = `rgba(232,238,255,${s.a * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (reduced) return;
      for (const m of meteors) {
        if (m.wait > 0) {
          m.wait -= 1;
          continue;
        }
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;
        const tx = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
        const ty = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${m.a})`);
        g.addColorStop(0.18, `rgba(186,214,255,${m.a * 0.55})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${m.a})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(180,210,255,0.22)`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 5, 0, Math.PI * 2);
        ctx.fill();
        if (m.x > w + 80 || m.y > h + 80 || m.life > 90) {
          Object.assign(m, spawnMeteor(true));
        }
      }
    };

    const drawSnow = () => {
      for (const f of flakes) {
        if (!reduced) {
          f.y += f.vy;
          f.x += f.vx + Math.sin(f.y * 0.012) * 0.25;
          f.rot += f.vr;
          if (f.y > h + 16) Object.assign(f, spawnFlake(false), { y: -16 });
          if (f.x < -20) f.x = w + 10;
          if (f.x > w + 20) f.x = -10;
        }
        if (f.kind === "petal") {
          drawPetal(ctx, f.x, f.y, f.r * 1.1, f.rot, `rgba(232,150,168,${0.45 + f.a * 0.35})`);
        } else if (f.r > 3.2) {
          drawSnowflake(ctx, f.x, f.y, f.r, f.rot, `rgba(110,130,160,${0.35 + f.a * 0.35})`);
        } else {
          ctx.fillStyle = `rgba(120,140,170,${0.28 + f.a * 0.35})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const draw = () => {
      if (themeRef.current !== mode) {
        mode = themeRef.current;
        rebuild();
      }
      ctx.clearRect(0, 0, w, h);
      if (mode === "night") drawNight();
      else drawSnow();
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
