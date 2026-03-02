"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  {
    label: "All Pages",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "Home",         href: "/" },
      { label: "Features",     href: "/features" },
      { label: "About",        href: "/about" },
      { label: "Contact",      href: "/contact" },
    ],
  },
  { label: "Pricing",     href: "/pricing",     hasDropdown: false },
  { label: "Integration", href: "/integration", hasDropdown: false },
];

// ─── Dropdown menu ────────────────────────────────────────────────────────────
function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="
        absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2
        w-44
        bg-white
        rounded-2xl
        border border-[#EAEDF0]
        shadow-[0_8px_32px_rgba(31,63,92,0.10)]
        overflow-hidden
        z-50
        py-1
      "
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="
            block px-4 py-2.5
            text-[14px] font-medium text-[#1F3F5C]
            hover:bg-[#F9FAFB] hover:text-[#0082FB]
            transition-colors duration-150
          "
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);

  // Add background shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = () => setOpenDropdown(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <header className="
      fixed top-0 left-0 right-0
      z-50
      flex justify-center
      px-4 sm:px-6
      pt-3 pb-2
    ">
      {/* ── Outer wrapper: 1280px max ── */}
      <div className="w-full max-w-[1280px] flex items-center justify-center">

        {/* ── Pill container ── */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`
            flex flex-row items-center
            bg-white
            rounded-full
            transition-shadow duration-300
            ${scrolled
              ? "shadow-[0_4px_24px_rgba(31,63,92,0.12)]"
              : "shadow-[0_2px_12px_rgba(31,63,92,0.06)]"
            }
            /* Mobile: full width pill */
            w-full
            /* Desktop: auto-sized pill */
            md:w-auto
            px-2
            py-2
            gap-0
          `}
        >

          {/* ── Logo ── */}
          <Link
            href="/"
            className="
              flex items-center
              pl-2 pr-4
              min-w-[106px] h-[34px]
              flex-shrink-0
            "
          >
            {/*
              📁 IMAGE REQUIRED:
              Save your logo as: /public/logo.svg  (or logo.png)
              It should be the agentoo wordmark, ~106×34px
            */}
            <Image
              src="/logo.svg"
              alt="Agentoo"
              width={106}
              height={34}
              priority
              className="object-contain"
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="
            hidden md:flex
            flex-row items-center
            gap-0 px-2
          ">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === link.label ? null : link.label);
                    }}
                    className="
                      flex items-center gap-1.5
                      px-4 h-[28px]
                      text-[16px] font-medium text-[#1F3F5C]
                      hover:text-[#0082FB]
                      transition-colors duration-150
                      whitespace-nowrap
                      rounded-full
                      hover:bg-[#F9FAFB]
                    "
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={13} strokeWidth={2.2} />
                    </motion.span>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="
                      flex items-center
                      px-4 h-[28px]
                      text-[16px] font-medium text-[#1F3F5C]
                      hover:text-[#0082FB]
                      transition-colors duration-150
                      whitespace-nowrap
                      rounded-full
                      hover:bg-[#F9FAFB]
                    "
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && openDropdown === link.label && link.dropdown && (
                    <DropdownMenu items={link.dropdown} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ── Spacer (desktop) ── */}
          <div className="hidden md:block flex-1" />

          {/* ── CTA Button ── */}
          <div className="hidden md:block flex-shrink-0 pl-2">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Link
                href="#beta"
                className="
                  inline-flex items-center justify-center
                  px-8 py-3.5
                  rounded-full
                  bg-[#0082FB]
                  text-[#F9FAFB] text-[14px] font-semibold leading-6
                  shadow-[0px_19px_11px_rgba(192,191,195,0.09),inset_0px_8px_8px_rgba(192,191,195,0.16)]
                  hover:bg-[#0074e0]
                  transition-colors duration-200
                  whitespace-nowrap
                "
              >
                Get Early Access
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile: CTA + Hamburger ── */}
          <div className="flex md:hidden items-center gap-2 ml-auto pr-1">
            <Link
              href="#beta"
              className="
                inline-flex items-center justify-center
                px-4 py-2
                rounded-full
                bg-[#0082FB]
                text-[#F9FAFB] text-[13px] font-semibold
                whitespace-nowrap
              "
            >
              Get Access
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                flex items-center justify-center
                w-9 h-9 rounded-full
                text-[#1F3F5C]
                hover:bg-[#F9FAFB]
                transition-colors
              "
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="
              absolute top-[calc(100%+4px)]
              left-4 right-4
              bg-white
              rounded-3xl
              border border-[#EAEDF0]
              shadow-[0_8px_40px_rgba(31,63,92,0.12)]
              overflow-hidden
              py-3
              z-40
            "
          >
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex items-center justify-between
                    px-6 py-3.5
                    text-[15px] font-medium text-[#1F3F5C]
                    hover:bg-[#F9FAFB] hover:text-[#0082FB]
                    transition-colors duration-150
                  "
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} className="text-[#6C7A89]" />}
                </Link>
              </div>
            ))}

            {/* Divider */}
            <div className="mx-6 my-2 h-px bg-[#EAEDF0]" />

            {/* Mobile full CTA */}
            <div className="px-4 pb-1">
              <Link
                href="#beta"
                onClick={() => setMobileOpen(false)}
                className="
                  flex items-center justify-center
                  w-full py-3
                  rounded-full
                  bg-[#0082FB]
                  text-[#F9FAFB] text-[14px] font-semibold
                  hover:bg-[#0074e0]
                  transition-colors duration-200
                "
              >
                Get Early Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}