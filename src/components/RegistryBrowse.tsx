/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  ShieldAlert, 
  BadgeCheck, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  Sparkles, 
  ChevronDown, 
  X,
  RefreshCw,
  Clock,
  ArrowRight
} from "lucide-react";
import { Listing, Platform } from "../types";
import { maskUsername, getBadgesForHandle, formatINR } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface RegistryBrowseProps {
  listings: Listing[];
  onSelectListing: (slug: string) => void;
}

export const RegistryBrowse: React.FC<RegistryBrowseProps> = ({ listings, onSelectListing }) => {
  const [search, setSearch] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [page, setPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Custom premium loading skeletons trigger
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  const itemsPerPage = 6;

  // Whenever inputs shift, trigger a quick 350ms skeleton animation
  useEffect(() => {
    setIsSimulatingLoad(true);
    const timer = setTimeout(() => {
      setIsSimulatingLoad(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [search, selectedPlatform, selectedRarity, sortBy]);

  const uniqueRarities = useMemo(() => {
    return ["all", "Legacy OG", "Short Name", "Fintech Accent", "Elite Brand", "Premium Vetted"];
  }, []);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...listings];

    // Search filter
    if (search.trim()) {
      result = result.filter((item) =>
        item.username.toLowerCase().includes(search.toLowerCase()) || 
        item.platform.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Platform filter
    if (selectedPlatform !== "all") {
      result = result.filter((item) => item.platform === selectedPlatform);
    }

    // Rarity Badge filter matching helper
    if (selectedRarity !== "all") {
      result = result.filter((item) => {
        const badges = getBadgesForHandle(item.username, item.platform);
        return badges.some(b => b.label.toLowerCase() === selectedRarity.toLowerCase());
      });
    }

    // Sorting algorithms logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.askingPrice - b.askingPrice);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.askingPrice - a.askingPrice);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
    }

    return result;
  }, [listings, search, selectedPlatform, selectedRarity, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedListings.length / itemsPerPage);

  const paginatedListings = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredAndSortedListings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedListings, page]);

  const handlePlatformChange = (p: string) => {
    setSelectedPlatform(p);
    setPage(1);
  };

  const clearFormFilters = () => {
    setSearch("");
    setSelectedPlatform("all");
    setSelectedRarity("all");
    setSortBy("price-asc");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 text-left">
      
      {/* Visual Header */}
      <div className="space-y-2 border-b border-white/[0.06] pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Vetted Namespace Registry</h1>
        <p className="text-xs text-gray-400">
          Discover premium, short, and brandable digital usernames audited manually for absolute custody access.
        </p>
      </div>

      {/* Advanced Filter, Search, and Sort Panel */}
      <div className="p-4 rounded-xl bg-[#0F0F10] border border-white/[0.08] space-y-4">
        
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Instant Search input */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search active listings..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none placeholder:text-gray-500 transition-colors focus:ring-1 focus:ring-blue-500/20"
              id="registry_search_input"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Quick Platform chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {["all", "instagram", "x", "telegram", "brandable"].map((p) => {
              const isActive = selectedPlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => handlePlatformChange(p)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer select-none border ${
                    isActive
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_2px_10px_rgba(59,130,246,0.2)]"
                      : "bg-[#151517] text-gray-400 border-white/[0.06] hover:text-white hover:border-white/[0.12]"
                  }`}
                  id={`chip_platform_${p}`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Sort Menu and Filter Trigger */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            
            {/* Sorting SELECT dropdown */}
            <div className="flex items-center gap-2 bg-[#151517] border border-white/[0.08] px-3 py-2 rounded-lg text-xs hover:border-white/[0.15] transition-colors relative">
              <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-300 font-semibold pr-4 outline-none cursor-pointer text-xs appearance-none"
                id="registry_sort_select"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A-Z</option>
                <option value="newest">Latest Audited</option>
              </select>
              <div className="absolute right-2.5 pointer-events-none">
                <ChevronDown className="h-3 w-3 text-gray-500" />
              </div>
            </div>

            {/* Expandable filters trigger button */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`h-9 px-3.5 gap-2 rounded-lg border text-xs font-semibold select-none flex items-center transition-all cursor-pointer ${
                isFilterDrawerOpen || selectedRarity !== "all"
                  ? "border-blue-500/30 bg-blue-500/[0.02] text-blue-400"
                  : "border-white/[0.08] hover:border-white/[0.15] text-gray-300"
              }`}
              id="registry_drawer_trigger"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {selectedRarity !== "all" && (
                <span className="h-2 w-2 rounded-full bg-blue-550" />
              )}
            </button>

          </div>

        </div>

        {/* Dynamic Expandable Filter Area */}
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden pt-4 border-t border-white/[0.06]"
              id="registry_filter_drawer"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Rarity Badge Segment</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {uniqueRarities.map((r) => {
                      const isMatch = selectedRarity === r;
                      return (
                        <button
                          key={r}
                          onClick={() => {
                            setSelectedRarity(r);
                            setPage(1);
                          }}
                          className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer border ${
                            isMatch
                              ? "bg-emerald-500/10 border-emerald-500/30 text-[#10B981]"
                              : "bg-[#151517] text-gray-400 border-white/[0.06] hover:text-white"
                          }`}
                        >
                          {r === "all" ? "All Rarities" : r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Operations Audit Rules</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Filters are processed locally inside our securely isolated workspace sandbox to keep search queries secure.
                  </p>
                </div>

                <div className="flex items-end justify-end">
                  <button
                    onClick={clearFormFilters}
                    className="h-8 px-3 rounded-lg border border-white/[0.08] hover:border-white/[0.15] text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Listings Grid with Simulated Performance Skeletons */}
      <AnimatePresence mode="wait">
        {isSimulatingLoad ? (
          <motion.div
            key="skeletons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="loading_skeletons_grid"
          >
            {[...Array(6)].map((_, idx) => (
              <div 
                key={idx}
                className="h-60 rounded-xl bg-[#0F0F10] border border-white/[0.06] p-6 space-y-6 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-16 bg-[#151517] rounded" />
                    <div className="h-5 w-24 bg-[#151517] rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 w-40 bg-[#151517] rounded" />
                    <div className="h-4 w-28 bg-[#151517] rounded" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/[0.04]">
                  <div className="space-y-1">
                    <div className="h-2 w-12 bg-[#151517] rounded" />
                    <div className="h-5 w-20 bg-[#151517] rounded" />
                  </div>
                  <div className="h-8 w-24 bg-[#151517] rounded" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="grid-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="browse_listings_grid"
          >
            {paginatedListings.length === 0 ? (
              <div className="col-span-full py-16 px-6 text-center text-xs text-gray-500 rounded-2xl bg-[#0F0F10] border border-white/[0.08] flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto" id="results_empty_state">
                <div className="h-14 w-14 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6 stroke-1.5" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-white font-bold text-sm">No Namespace Listings Found</h3>
                  <p className="text-[#9CA3AF] text-[11px] leading-relaxed">
                    We couldn't locate any active vetted assets matching your search metrics. You can clear current filters or commission a custom sourcing task below.
                  </p>
                </div>
                <button
                  onClick={clearFormFilters}
                  className="px-4 py-2 text-[10px] font-bold uppercase rounded-lg border border-white/[0.08] hover:border-white/[0.15] text-white transition-colors cursor-pointer"
                >
                  Clear Dynamic Criteria
                </button>
              </div>
            ) : (
              paginatedListings.map((item) => {
                const badges = getBadgesForHandle(item.username, item.platform);
                const masked = maskUsername(item.username);
                return (
                  <motion.article
                    key={item.id}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="p-6 rounded-2xl bg-[#0F0F10] border border-white/[0.08] hover:border-white/[0.15] flex flex-col justify-between h-60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.55)] group relative overflow-hidden"
                  >
                    {/* Tiny neon border line on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4">
                      
                      {/* Badge header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider font-mono font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/15 px-2.5 py-0.5 rounded-full">
                          {item.platform}
                        </span>
                        
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                          <BadgeCheck className="h-3 w-3 stroke-[2.5]" />
                          Vetted Custody
                        </span>
                      </div>

                      {/* Username Title & Badge list */}
                      <div className="space-y-2.5">
                        <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                          @{masked}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {badges.map((b, idx) => (
                            <span
                              key={idx}
                              className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full border tracking-wide uppercase ${b.style}`}
                            >
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Footer values layout */}
                    <div className="flex items-end justify-between pt-4 border-t border-white/[0.06] mt-4 z-10">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-0.5">
                          Broker Valuation
                        </span>
                        <span className="text-xl font-extrabold text-emerald-450 font-mono">
                          {formatINR(item.askingPrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectListing(item.slug)}
                        className="h-8 px-4 rounded-lg bg-white hover:bg-gray-200 text-black transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer select-none"
                      >
                        <span>Negotiate Deal</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.article>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination component controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="h-9 px-4 text-[10px] font-bold uppercase rounded-lg border border-white/[0.08] text-gray-400 disabled:opacity-35 disabled:pointer-events-none hover:text-white cursor-pointer transition-colors select-none"
          >
            Prev Page
          </button>
          
          <span className="text-xs font-mono font-medium text-gray-450 uppercase tracking-widest">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="h-9 px-4 text-[10px] font-bold uppercase rounded-lg border border-white/[0.08] text-gray-400 disabled:opacity-35 disabled:pointer-events-none hover:text-white cursor-pointer transition-colors select-none"
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};
