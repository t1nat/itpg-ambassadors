"use client";

import "@/lib/i18n/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useMounted } from "@/lib/hooks";

/**
 * Navigation component with responsive design
 * Supports both desktop and mobile views with smooth animations
 */
export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { t, locale, setLocale } = useLocale();

  // Sync i18n language with URL locale
  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Memoize navigation links to prevent recreation on each render
  const links = useMemo(
    () => [
      { href: `/${locale}`, label: t("nav.home") },
      { href: `/${locale}/ambassadors`, label: t("nav.ambassadors") },
      { href: `/${locale}/teachers`, label: t("nav.teachers") },
      { href: `/${locale}/projects`, label: t("nav.projects") },
      { href: `/${locale}/results`, label: t("nav.results") },
    ],
    [locale, t],
  );

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 right-0 z-50" aria-label="Main navigation">
        <div className="relative px-8 py-4">
          <div className="h-10" /> {/* Placeholder for content */}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 right-0 z-50" aria-label="Main navigation">
      <div className="relative">
        <div className="relative px-8 py-4">
          <div className="flex items-center justify-end gap-6">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex" role="menubar">
              {links.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`relative px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-cyan-600 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-teal-400 after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${
                      pathname === link.href ? "text-cyan-600 after:w-full" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="ml-2">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:bg-gray-100 rounded-full"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            role="menu"
          >
            <div className="p-4">
              {links.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} role="none">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    role="menuitem"
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      pathname === link.href ? "text-cyan-600 bg-cyan-50" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
