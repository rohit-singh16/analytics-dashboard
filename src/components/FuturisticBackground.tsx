import { useEffect, useRef } from "react";

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // 🎯 CALM + VISIBLE SETTINGS
    const DOT_COUNT = 26;        // few dots
    const MAX_DIST = 160;        // slightly longer lines
    const MAX_LINKS = 2;         // max 2 lines per dot

    const dots: {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }[] = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
      });
    }

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const animate = () => {
      // Background
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(5, 15, 35, 1)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < DOT_COUNT; i++) {
        const d = dots[i];

        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        // ✨ Dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,220,255,0.75)";
        ctx.fill();

        // 🔗 LIMITED, VISIBLE CONNECTIONS
        let links = 0;

        for (let j = i + 1; j < DOT_COUNT; j++) {
          if (links >= MAX_LINKS) break;

          const dx = d.x - dots[j].x;
          const dy = d.y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            ctx.strokeStyle = `rgba(99,102,241,${
              0.35 * (1 - dist / MAX_DIST)
            })`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();

            links++;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(circle at center, #0a1224, #050a15)",
      }}
    />
  );
}
