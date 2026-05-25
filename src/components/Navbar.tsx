/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Shield, Menu, X, ArrowUpRight } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onContactBroker: () => void;
}

const navItems = [
  { label: "Inventory", to: "/inventory" },
  { label: "Process",   to: "/process" },
  { label: "Trust",     to: "/trust" },
  { label: "Journal",   to: "/journal" },
  { label: "About",     to: "/about" },
];

export const Navbar: React.FC<NavbarProps> = ({ onContactBroker }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.06] bg-[#050505]/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white font-semibold tracking-tight cursor-pointer hover:opacity-90 group transition-all"
          id="nav_logo"
        >
          <div className="h-8 w-8 rounded-lg bg-[#0F0F10] border border-white/[0.08] flex items-center justify-center group-hover:border-blue-500/30 transition-all">
            <Shield className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="font-semibold text-[15px] text-white tracking-tight">IDsvault</span>
            <span className="text-[8px] font-mono font-bold tracking-widest text-[#10B981] uppercase">brokerage</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0F0F10] border border-white/[0.04]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors duration-200 rounded-full select-none ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`
              }
              id={`nav_item_${item.to.replace("/", "") || "home"}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onContactBroker}
            className="relative group h-9 px-4 text-xs font-semibold rounded-lg bg-[#C9A961] hover:bg-[#D4B670] text-[#0A0A0B] transition-all cursor-pointer select-none active:scale-95 flex items-center gap-1.5"
            id="nav_inquire_cta"
          >
            Inquire
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-gray-400 hover:text-white transition-all cursor-pointer"
          aria-label="Toggle navigation menu"
          id="mobile_menu_trigger"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-white/[0.06] bg-[#0F0F10] overflow-hidden"
            id="mobile_drawer"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium py-1 text-left transition-colors cursor-pointer select-none ${
                      isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3">
                <Link
                  to="/inventory"
                  className="h-10 text-center text-xs font-bold rounded-lg bg-[#C9A961] hover:bg-[#D4B670] text-[#0A0A0B] cursor-pointer flex items-center justify-center gap-1"
                >
                  Browse Handles
                </Link>
                <Link
                  to="/sell"
                  className="h-10 text-center text-xs font-semibold rounded-lg border border-white/[0.08] hover:border-white/[0.15] text-white cursor-pointer flex items-center justify-center gap-1"
                >
                  Sell Yours
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
