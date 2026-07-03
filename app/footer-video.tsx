"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MonitorPlay } from "lucide-react";

export function FooterVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 4, -10]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let direction: "forward" | "reverse" = "forward";

    function playForward() {
      cancelAnimationFrame(rafRef.current);
      direction = "forward";
      video!.playbackRate = 1;
      video!.play().catch(() => {});
    }

    function playReverse() {
      cancelAnimationFrame(rafRef.current);
      direction = "reverse";
      video!.pause();
      reverseStep();
    }

    function reverseStep() {
      if (direction !== "reverse") return;
      if (video!.currentTime <= 0) {
        playForward();
        return;
      }
      video!.currentTime = Math.max(0, video!.currentTime - 1 / 30);
      rafRef.current = requestAnimationFrame(reverseStep);
    }

    video.addEventListener("ended", playReverse);
    playForward();

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("ended", playReverse);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto mb-20 mt-20 w-[min(1100px,94%)] perspective-[1800px]"
    >
      <motion.div
        style={{ rotateX, y, transformStyle: "preserve-3d" }}
        className="relative mx-auto max-w-3xl [transform-origin:center_center]"
      >
        {/* Monitor bezel */}
        <div className="relative rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
          {/* Top bar with camera + status */}
          {/* <div className="absolute inset-x-0 -top-px z-20 flex items-center justify-between px-5 pt-2 text-[10px] font-medium text-white/40">
            <span>OyeNaukri · Talent Engine</span>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
              LIVE
            </div>
          </div> */}
          <div className="mx-auto -mb-1 size-1.5 rounded-full bg-white/15 ring-1 ring-white/10" />

          {/* Screen */}
          <div className="relative overflow-hidden rounded-[1.1rem] bg-black ring-1 ring-white/10 [transform:translateZ(20px)]">
            <video
              ref={videoRef}
              className="h-auto w-full object-cover"
              playsInline
              muted
              preload="auto"
              src="/footer_v2.mp4"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/10 to-transparent" />
            {/* HUD chips */}
            {/* <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
              {["Hiring", "AI Match", "Live Pipeline"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white/80 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div> */}
            {/* <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur">
              <MonitorPlay className="size-3.5 text-emerald-400" />
              Talent at work
            </div> */}
          </div>

          {/* Stand */}
          <div className="relative mx-auto mt-3">
            <div className="mx-auto h-2 w-28 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900" />
            <div className="mx-auto h-1.5 w-44 rounded-b-xl bg-zinc-950 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)]" />
          </div>
        </div>

        {/* Glow */}
        <div className="pointer-events-none absolute -inset-x-10 -bottom-10 -z-10 h-40 rounded-full bg-brand/30 blur-3xl" />
      </motion.div>
    </section>
  );
}