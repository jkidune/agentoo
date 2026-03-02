"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";

export function Hero() {
  return (
    <section className="relative flex justify-center items-center px-20 pt-[170px] pb-[60px] isolate overflow-hidden min-h-[802px]">
      
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/hero-bg.png')" }} />
      
      {/* Top nav border line */}
      <div className="absolute left-0 right-0 top-[55.95px] h-px bg-border z-10" />

      {/* Container */}
      <div className="relative z-20 w-full max-w-container flex flex-row items-start gap-0">

        {/* Left — Content */}
        <div className="flex flex-col justify-center gap-8 py-[30px] flex-1 max-w-[640px]">
          
          {/* Heading */}
          <div className="flex flex-col gap-6">
            <h1 className="text-heading-1 font-medium text-cello leading-[70px] tracking-tighter">
              <TextReveal text="Revolutionize support." delay={0} />
              {" "}
              <TextReveal text="with AI agents that" delay={0.3} />
              {" "}
              <span className="text-slate">
                <TextReveal text="never sleep." delay={0.6} />
              </span>
            </h1>

            {/* Subheading */}
            <FadeIn delay={0.9}>
              <p className="text-body-lg text-cello opacity-84 max-w-[455px]">
                Instant responses, 100% uptime, and smart AI agents that
                support you with how you interact, expand, and staying your team.
              </p>
            </FadeIn>
          </div>

          {/* CTA Button */}
          <FadeIn delay={1.1}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                className="bg-accent text-surface font-semibold text-label px-8 py-3.5 rounded-pill shadow-cta hover:bg-accent/90 transition-colors w-fit"
              >
                Join the Beta Program
              </Button>
            </motion.div>
          </FadeIn>
        </div>

        {/* Right — Image */}
        <FadeIn delay={0.4} direction="left" className="flex-1 flex justify-center items-center max-w-[640px]">
          <div className="relative w-full h-[572px] rounded-card overflow-hidden border border-border border-b-0">
            <img
              src="/images/hero-dashboard.png"
              alt="Dashboard preview"
              className="w-full h-full object-cover rounded-card"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}