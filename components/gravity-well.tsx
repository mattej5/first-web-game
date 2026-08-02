"use client";

import { useEffect, useRef } from "react";

/**
 * Gravity well — a tilted accretion disk of orbiting particles behind the hero.
 * Pure 2D canvas: particles follow Keplerian-ish elliptical orbits in a plane,
 * projected with a fixed tilt so the disk reads as 3D. Each particle is drawn
 * as a short dash along its orbital direction, so the canvas stays transparent
 * and the grid behind it shows through.
 *
 * Perf/UX guardrails: DPR capped at 2, particle count scales with width, a
 * static frame is always painted at mount (no blank flash), animation pauses
 * when the hero scrolls offscreen or the tab is hidden, and
 * prefers-reduced-motion keeps the static frame only.
 */

const ACCENT = { r: 165, g: 228, b: 70 };

type Particle = {
  radius: number; // orbit radius (unitless, scaled at draw time)
  angle: number;
  speed: number; // angular speed, rad/s
  wobble: number; // vertical scatter out of the disk plane
  accent: boolean;
  size: number;
};

export function GravityWell({
  center = { x: 0.77, y: 0.42 },
  mobileCenter = { x: 0.5, y: 0.85 },
}: {
  center?: { x: number; y: number };
  mobileCenter?: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let raf: number | null = null;
    let running = false;
    let inView = true;

    // Pointer parallax: the disk tilts a few degrees toward the cursor.
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = W < 640 ? 260 : W < 1024 ? 420 : 620;
      particles = Array.from({ length: count }, () => {
        // Density concentrated near the event horizon, thinning outward.
        const radius = 0.16 + Math.pow(Math.random(), 1.7) * 0.84;
        return {
          radius,
          angle: rand(0, Math.PI * 2),
          speed: 0.5 / Math.pow(radius, 1.5), // inner orbits move faster
          wobble: rand(-0.045, 0.045),
          accent: Math.random() < 0.07,
          size: rand(0.7, 1.6),
        };
      });
    };

    const drawFrame = (dt: number) => {
      ctx.clearRect(0, 0, W, H);

      const mobile = W < 1024;
      const c = mobile ? mobileCenter : center;
      const cx = W * c.x;
      const cy = H * c.y;
      const scale = Math.min(W, 1100) * (mobile ? 0.3 : 0.36);

      // Keep dashes from washing over the hero copy: fade anything that
      // drifts left toward the text column (desktop layout only).
      const containerW = Math.min(W - 48, 896);
      const textRight = (W - containerW) / 2 + 512;

      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;

      // Disk plane: squash for tilt, then rotate the whole disk on screen.
      const squash = 0.34 + tiltX; // ellipse aspect
      const rot = -0.42 + tiltY; // screen-space rotation (radians)
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);

      const horizonR = scale * 0.13;

      type Projected = {
        x: number;
        y: number;
        tx: number; // tail of the orbital dash
        ty: number;
        alpha: number;
        accent: boolean;
        size: number;
        front: boolean;
        occluded: boolean;
      };
      const projected: Projected[] = [];

      for (const p of particles) {
        p.angle += p.speed * dt;

        const sinA = Math.sin(p.angle);
        const cosA = Math.cos(p.angle);
        const ox = cosA * p.radius;
        const oy = sinA * p.radius * squash + p.wobble;

        const x = cx + (ox * cosR - oy * sinR) * scale;
        const y = cy + (ox * sinR + oy * cosR) * scale;

        // Dash along the orbital direction, longer where the orbit is faster.
        const dxo = -sinA * p.radius;
        const dyo = cosA * p.radius * squash;
        let tx = dxo * cosR - dyo * sinR;
        let ty = dxo * sinR + dyo * cosR;
        const tlen = Math.hypot(tx, ty) || 1;
        const dashLen = Math.min(2 + (p.speed * p.radius * scale) / 42, 13);
        tx = x - (tx / tlen) * dashLen;
        ty = y - (ty / tlen) * dashLen;

        // "Front" half of the orbit passes in front of the sphere.
        const front = sinA > 0;
        const dx = x - cx;
        const dy = y - cy;
        const occluded = !front && dx * dx + dy * dy < horizonR * horizonR;

        // Brighter near the center, dimmer at the rim; front half brighter.
        let brightness =
          (0.16 + 0.5 * (1 - (p.radius - 0.16) / 0.84)) *
          (front ? 1 : 0.55) *
          (mobile ? 0.55 : 0.8);
        if (!mobile) {
          const guard = Math.min(
            Math.max((x - (textRight - 40)) / 220, 0.12),
            1
          );
          brightness *= guard;
        }

        projected.push({
          x,
          y,
          tx,
          ty,
          alpha: brightness,
          accent: p.accent,
          size: p.size,
          front,
          occluded,
        });
      }

      const drawSet = (front: boolean) => {
        for (const q of projected) {
          if (q.front !== front || q.occluded) continue;
          ctx.strokeStyle = q.accent
            ? `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${q.alpha})`
            : `rgba(255,255,255,${q.alpha})`;
          ctx.lineWidth = q.size;
          ctx.beginPath();
          ctx.moveTo(q.tx, q.ty);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      };

      // Back half → event horizon → front half.
      drawSet(false);

      const sphere = ctx.createRadialGradient(
        cx - horizonR * 0.3,
        cy - horizonR * 0.3,
        horizonR * 0.1,
        cx,
        cy,
        horizonR
      );
      sphere.addColorStop(0, "rgba(20,20,20,1)");
      sphere.addColorStop(0.8, "rgba(5,5,5,1)");
      sphere.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      ctx.stroke();

      drawSet(true);
    };

    let last: number | null = null;
    const tick = (now: number) => {
      if (!running) return;
      if (last === null) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      drawFrame(dt);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion || !inView || document.hidden) return;
      running = true;
      last = null;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    build();
    drawFrame(0); // always paint a first frame, even in hidden/reduced-motion states
    start();

    const ro = new ResizeObserver(() => {
      build();
      drawFrame(0);
    });
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(parent);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * 0.1;
      targetTiltX = ny * 0.06;
    };
    if (!reducedMotion) {
      parent.addEventListener("pointermove", onPointerMove);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      parent.removeEventListener("pointermove", onPointerMove);
    };
  }, [center, mobileCenter]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        display: "block",
      }}
    />
  );
}
