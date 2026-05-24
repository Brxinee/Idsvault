/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, Menu, X, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onContactBroker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onContactBroker }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Browse IDs", value: "browse" },
    { label: "Sell Your ID", value: "sell" },
    { label: "Request ID", value: "request" },
    { label: "Blog", value: "blog" },
    { label: "FAQ", value: "faq" },
    { label: "Contact", value: "contact" }
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.06] bg-[#050505]/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Vibe */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 text-white font-semibold tracking-tight cursor-pointer hover:opacity-90 group transition-all"
          id="nav_logo"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full group-hover:bg-blue-500/30 transition-all duration-300" />
            <div className="relative h-8 w-8 rounded-lg bg-[#0F0F10] border border-white/[0.08] flex items-center justify-center group-hover:border-blue-500/30 transition-all">
              <Shield className="h-4.5 w-4.5 text-blue-500" />
            </div>
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="font-semibold text-[15px] text-white tracking-tight">IDsvault</span>
            <span className="text-[8px] font-mono font-bold tracking-widest text-[#10B981] uppercase">brokerage</span>
          </div>
        </button>

        {/* Desktop Navigation Links (Linear Inspired) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0F0F10] border border-white/[0.04]">
          {navItems.map((item) => {
            const isActive = currentView === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`relative px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors duration-200 rounded-full select-none ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
                id={`nav_item_${item.value}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA actions with glowing focus states */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick("browse")}
            className="h-9 px-4 text-xs font-semibold rounded-lg border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] text-gray-200 transition-all cursor-pointer select-none active:scale-95"
            id="nav_nav_buy"
          >
            Explore Registry
          </button>
          <button
            onClick={() => handleNavClick("sell")}
            className="relative group overflow-hidden h-9 px-4 text-xs font-semibold rounded-lg bg-blue-650 hover:bg-blue-600 border border-blue-500/20 text-white transition-all cursor-pointer select-none active:scale-95"
            id="nav_nav_sell"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-1">
              List For Sale
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Burger and Close Controls */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-gray-400 hover:text-white transition-all cursor-pointer"
          aria-label="Toggle navigation menu"
          id="mobile_menu_trigger"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer Slide and Fade Animation */}
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
              {navItems.map((item) => {
                const isActive = currentView === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`text-sm font-medium py-1 text-left transition-colors cursor-pointer select-none ${
                      isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavClick("browse")}
                  className="h-10 text-center text-xs font-semibold rounded-lg border border-white/[0.08] hover:border-white/[0.15] text-white cursor-pointer"
                >
                  Explore Registry
                </button>
                <button
                  onClick={() => handleNavClick("sell")}
                  className="h-10 text-center text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                >
                  List For Sale
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
