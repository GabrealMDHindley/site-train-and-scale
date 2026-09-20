"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-+=";
const DURATION = 900;

// Mono eyebrow labels "decode" into place — characters cycle through random
// glyphs and resolve left to right. Screen readers get the real text only.
export default function Decode({
  text,
  className = "",
  immediate = false,
}: {
  text: string;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const ran = useRef(false);

  useEffect(() => {
    if (reduce || ran.current || !(immediate || inView)) return;
    ran.current = true;

    const start = performance.now();
    let raf = 0;
    let lastFrame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      if (now - lastFrame > 38 || p >= 1) {
        lastFrame = now;
        const resolved = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || i < resolved) out += ch;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(p >= 1 ? text : out);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [immediate, inView, reduce, text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
