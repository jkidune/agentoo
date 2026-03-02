"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// ─── Reusable animation: letter-by-letter blur reveal ───────────────────────
function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.22em] last:mr-0">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
              animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: delay + (wi * 6 + ci) * 0.028,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

// ─── Reusable animation: scroll-triggered fade-in ───────────────────────────
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const offset = {
    up:    { y: 32, x: 0 },
    down:  { y: -32, x: 0 },
    left:  { x: 48, y: 0 },
    right: { x: -48, y: 0 },
  }[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative w-full min-h-[802px] flex flex-col overflow-hidden isolate">

      {/* ── Background image spanning full width ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle overlay so text stays readable */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* ── Horizontal rule below navbar ── */}
      <div className="absolute left-0 right-0 top-[56px] h-px bg-[#EAEDF0] z-10" />

      {/* ── Main container ── */}
      <div className="
        relative z-20
        w-full max-w-[1280px] mx-auto
        px-6 sm:px-10 lg:px-16 xl:px-20
        pt-[140px] pb-[60px]
        flex flex-col lg:flex-row
        items-center lg:items-start
        gap-10 lg:gap-6
      ">

        {/* ─── LEFT COLUMN: Content ─────────────────────────────────────── */}
        <div className="
          flex flex-col justify-center gap-8
          w-full lg:w-1/2 lg:max-w-[640px]
          lg:py-[30px]
          text-center lg:text-left
          items-center lg:items-start
        ">

          {/* Badge / eyebrow */}
          <FadeIn delay={0.1}>
            <span className="
              inline-flex items-center gap-2
              px-4 py-1.5
              rounded-full
              border border-[#EAEDF0]
              bg-white/80 backdrop-blur-sm
              text-[13px] font-medium text-[#6C7A89]
              shadow-sm
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0082FB] animate-pulse" />
              Now in Beta
            </span>
          </FadeIn>

          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="
              font-medium leading-[1.09]
              text-[40px] sm:text-[52px] lg:text-[64px]
              tracking-[-1.5px]
              text-[#1F3F5C]
            ">
              <TextReveal text="Revolutionize" delay={0.15} />
              {" "}
              <TextReveal text="support," delay={0.35} />
              <br />
              <TextReveal text="with AI agents" delay={0.6} />
              <br className="hidden sm:block" />
              {" "}
              <TextReveal text="that" delay={0.85} />
              {" "}
              <span className="text-[#6C7A89]">
                <TextReveal text="never sleep." delay={1.0} />
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <FadeIn delay={1.3}>
            <p className="
              text-[17px] sm:text-[18px]
              leading-[1.72]
              text-[#1F3F5C]/80
              max-w-[455px]
            ">
              Instant responses, 100% uptime, and smart AI agents that
              support you with how you interact, expand, and smarten
              your team.
            </p>
          </FadeIn>

          {/* CTA Button */}
          <FadeIn delay={1.5}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,130,251,0.28)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="
                flex items-center justify-center
                px-8 py-3.5
                rounded-full
                bg-[#0082FB]
                text-[#F9FAFB]
                text-[14px] font-semibold leading-6
                shadow-[0px_19px_11px_rgba(192,191,195,0.09),inset_0px_8px_8px_rgba(192,191,195,0.16)]
                hover:bg-[#0074e0]
                transition-colors duration-200
                cursor-pointer
                whitespace-nowrap
              "
            >
              Join the Beta Program
            </motion.button>
          </FadeIn>
        </div>

        {/* ─── RIGHT COLUMN: Dashboard image ───────────────────────────── */}
        <FadeIn
          delay={0.5}
          direction="left"
          className="
            w-full lg:w-1/2 lg:max-w-[640px]
            flex items-center justify-center
            lg:justify-end
          "
        >
          <motion.div
            whileHover={{ y: -6, boxShadow: "0 32px 64px rgba(31,63,92,0.12)" }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="
              relative
              w-full max-w-[580px]
              aspect-[580/572]
              rounded-[13px] overflow-hidden
              border border-[#EAEDF0]
              border-b-0
              shadow-[0_8px_40px_rgba(31,63,92,0.08)]
            "
          >
            <Image
              src="/hero-dashboard.png"
              alt="Agentoo AI dashboard"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </FadeIn>

      </div>
    </section>
  );
}