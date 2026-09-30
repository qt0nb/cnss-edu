"use client";

import React, { useEffect, useRef } from "react";

/**
 * NetBackground — a living network-science backdrop.
 * Drifting nodes, proximity links, and occasional packet pulses
 * travelling along edges. Pure canvas, GPU-light, pauses when
 * the tab is hidden and renders a single static frame when the
 * user prefers reduced motion.
 */
export default function NetBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dark = document.documentElement.classList.contains("dark");

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    type Packet = { a: number; b: number; t: number; speed: number };
    const N = 42;
    const LINK = 150;
    const nodes: Node[] = [];
    const packets: Packet[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes.length = 0;
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 1.4 + Math.random() * 1.6,
        });
      }
    };

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      packets.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.008 });
    };

    const colors = () => {
      // emerald family, tuned per theme
      const node = dark ? "rgba(52, 211, 153, 0.5)" : "rgba(5, 150, 105, 0.45)";
      const linkBase = dark ? 0.13 : 0.16;
      const packet = dark ? "rgba(110, 231, 183, 0.9)" : "rgba(4, 120, 87, 0.85)";
      return { node, linkBase, packet };
    };

    const draw = () => {
      const { node, linkBase, packet } = colors();
      ctx.clearRect(0, 0, W, H);

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const alpha = linkBase * (1 - d / LINK);
            ctx.strokeStyle = dark
              ? `rgba(52, 211, 153, ${alpha})`
              : `rgba(5, 150, 105, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) { packets.splice(k, 1); continue; }
        p.t += p.speed;
        if (p.t >= 1) { packets.splice(k, 1); continue; }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // trail
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.06);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.06);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, packet);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = packet;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }
      if (Math.random() < 0.05 && packets.length < 7) spawnPacket();
      draw();
      if (running) raf = requestAnimationFrame(step);
    };

    resize();
    seed();
    draw();
    if (!reduced) {
      raf = requestAnimationFrame(step);

      const onVis = () => {
        if (document.hidden) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (!running) {
          running = true;
          raf = requestAnimationFrame(step);
        }
      };
      const themeObs = new MutationObserver(() => {
        dark = document.documentElement.classList.contains("dark");
        draw();
      });
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      document.addEventListener("visibilitychange", onVis);

      return () => {
        running = false;
        cancelAnimationFrame(raf);
        document.removeEventListener("visibilitychange", onVis);
        themeObs.disconnect();
        window.removeEventListener("resize", resize);
      };
    }
     
    window.addEventListener("resize", resize);
    // reduced-motion: static frame only, cheap listener cleanup
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full opacity-[0.35] dark:opacity-40 pointer-events-none"
    />
  );
}
