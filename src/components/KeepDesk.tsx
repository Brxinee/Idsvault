import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Pin, 
  Plus, 
  Trash2, 
  Archive, 
  Palette, 
  CheckSquare, 
  Type, 
  Image as ImageIcon, 
  Tag, 
  Search, 
  Sparkles, 
  RefreshCw, 
  Cloud, 
  Check, 
  X, 
  AlertCircle,
  FileCheck,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { KeepNote, KeepChecklistItem } from "../types";

// Default preloaded templates for high trust & immediate utility
const DEFAULT_NOTES: KeepNote[] = [
  {
    id: "note-1",
    title: "🔒 INSTAGRAM ESCROW HANDOVER PROTOCOL",
    content: "Official operational guidelines for secure high-AOV instagram handles. Never skip OGE metadata verification.",
    isPinned: true,
    isArchived: false,
    color: "amber",
    label: "Escrow Checklist",
    image: null,
    isGoogleSynced: true,
    lastUpdated: new Date().toLocaleDateString(),
    checklist: [
      { id: "item-1", text: "Generate secure Bio challenge token & check 15-min scan", done: true },
      { id: "item-2", text: "Request historic IP log screen capture from original creator", done: true },
      { id: "item-3", text: "Validate Original Creation Email (OGE) inbox access keys", done: false },
      { id: "item-4", text: "De-link facebook pages, generic phone linkages & ad desks", done: false },
      { id: "item-5", text: "Confirm buyer has set up fresh authenticators & offline backup codes", done: false }
    ]
  },
  {
    id: "note-2",
    title: "🎯 HYDERABAD PRIVATE TARGETS WATCHLIST",
    content: "Premium fintech & luxury single-letter acronym brand goals. Track these usernames for the upcoming Q3 campaign.",
    isPinned: false,
    isArchived: false,
    color: "blue",
    label: "Sourcing",
    image: null,
    isGoogleSynced: true,
    lastUpdated: new Date().toLocaleDateString(),
    checklist: [
      { id: "item-2-1", text: "Negotiate deal status with owner of @pay", done: false },
      { id: "item-2-2", text: "Check bio check status on @block", done: true },
      { id: "item-2-3", text: "Send manual broker inquiry to creator of @giga", done: false }
    ]
  },
  {
    id: "note-3",
    title: "🔍 VALUATION FORMULA NOTES",
    content: "Base value for single dictionary names starts at ₹3,50,000. 3-Letter acronyms with clean history start at ₹1,80,000. Check platform trademark registries for any active brand disputes beforehand.",
    isPinned: false,
    isArchived: false,
    color: "green",
    label: "Registry",
    image: null,
    isGoogleSynced: true,
    lastUpdated: new Date().toLocaleDateString(),
    checklist: null
  }
];

// Color definitions for Google Keep style background color variations
const COLORS_LIST = [
  { value: "dark", label: "Default", bg: "bg-[#0F0F10]", border: "border-white/[0.08]" },
  { value: "amber", label: "Gold Glow", bg: "bg-amber-950/20", border: "border-amber-500/30", text: "text-amber-400" },
  { value: "blue", label: "Tech Blue", bg: "bg-blue-950/20", border: "border-blue-500/30", text: "text-blue-400" },
  { value: "green", label: "Safe Emerald", bg: "bg-emerald-950/20", border: "border-emerald-500/30", text: "text-emerald-400" },
  { value: "red", label: "Alert Rose", bg: "bg-rose-950/20", border: "border-rose-500/30", text: "text-rose-400" }
];

const LABELS_LIST = ["All", "Escrow Checklist", "Sourcing", "Registry", "Personal"];

export const KeepDesk: React.FC = () => {
  const [notes, setNotes] = useState<KeepNote[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("idsvault_keep_notes");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_NOTES;
        }
      }
    }
    return DEFAULT_NOTES;
  });

  // State Management for UI interaction
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [isExpandingCreator, setIsExpandingCreator] = useState(false);
  const [isSyncingMock, setIsSyncingMock] = useState(false);
  
  // New Note Creator Form parameters
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLabel, setNewLabel] = useState("Escrow Checklist");
  const [newColor, setNewColor] = useState("dark");
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [newIsChecklist, setNewIsChecklist] = useState(false);
  const [newChecklistItems, setNewChecklistItems] = useState<string[]>([""]);
  const [newImage, setNewImage] = useState<string | null>(null);
  
  // Drag and drop attachment trigger state
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("idsvault_keep_notes", JSON.stringify(notes));
  }, [notes]);

  // Handle Drag & Drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Only image attachments are allowed for note visual security proofs!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewImage(event.target.result as string);
        setIsExpandingCreator(true);
      }
    };
    reader.readAsDataURL(file);
  };

  // Note actions
  const triggerSyncCloudAnimation = () => {
    if (isSyncingMock) return;
    setIsSyncingMock(true);
    setTimeout(() => {
      setIsSyncingMock(false);
      setNotes(prev => prev.map(n => ({ ...n, isGoogleSynced: true })));
    }, 1500);
  };

  const handleCreateNote = () => {
    if (!newTitle.trim() && !newContent.trim() && (!newIsChecklist || newChecklistItems.every(i => !i.trim()))) {
      setIsExpandingCreator(false);
      return;
    }

    let checklist: KeepChecklistItem[] | null = null;
    if (newIsChecklist) {
      checklist = newChecklistItems
        .filter(item => item.trim() !== "")
        .map((text, idx) => ({
          id: `item-new-${idx}-${Date.now()}`,
          text,
          done: false
        }));
    }

    const noteToAdd: KeepNote = {
      id: `note-${Date.now()}`,
      title: newTitle.trim() || "Untitled Vault Note",
      content: newContent.trim(),
      isPinned: newIsPinned,
      isArchived: false,
      color: newColor,
      label: newLabel,
      image: newImage,
      isGoogleSynced: false,
      lastUpdated: new Date().toLocaleDateString(),
      checklist
    };

    setNotes(prev => [noteToAdd, ...prev]);
    resetForm();
    triggerSyncCloudAnimation();
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setNewColor("dark");
    setNewLabel("Escrow Checklist");
    setNewIsPinned(false);
    setNewIsChecklist(false);
    setNewChecklistItems([""]);
    setNewImage(null);
    setIsExpandingCreator(false);
  };

  const handleTogglePin = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const handleArchiveNote = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isArchived: !n.isArchived } : n));
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this secure desk note from local cache?")) {
      setNotes(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleUpdateNoteColor = (id: string, color: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, color } : n));
  };

  const handleUpdateNoteLabel = (id: string, label: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, label } : n));
  };

  const handleToggleChecklistItem = (noteId: string, itemId: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id !== noteId || !n.checklist) return n;
      return {
        ...n,
        checklist: n.checklist.map(item => item.id === itemId ? { ...item, done: !item.done } : item)
      };
    }));
  };

  const handleAddCreatorChecklistItem = () => {
    setNewChecklistItems(prev => [...prev, ""]);
  };

  const handleUpdateCreatorCheckitemValue = (index: number, val: string) => {
    const updated = [...newChecklistItems];
    updated[index] = val;
    setNewChecklistItems(updated);
  };

  const handleRemoveCreatorCheckitem = (index: number) => {
    const updated = newChecklistItems.filter((_, i) => i !== index);
    setNewChecklistItems(updated.length > 0 ? updated : [""]);
  };

  const handleLoadTemplate = (type: "sourcing" | "verification" | "escrow") => {
    setIsExpandingCreator(true);
    if (type === "sourcing") {
      setNewTitle("🎯 Sourcing: Handle Inquiry Tracker");
      setNewContent("Platform: Instagram\nTarget Handle: @[name]\nPrimary Niche: Finance & Wealth\nEstimated Deal CAP: ₹2,50,000\nLast Contact Date: \nPending actions:");
      setNewLabel("Sourcing");
      setNewColor("blue");
      setNewIsChecklist(true);
      setNewChecklistItems(["Send first offer message via verified liaison", "Request screenshot of creation year details", "Audit handle's public mentions on trade forums"]);
    } else if (type === "verification") {
      setNewTitle("🛡️ Verification Audit: Bio Challenge Challenge");
      setNewContent("Target username verification challenge parameters. Insert custom challenge codes.\nAudit Ref: IDSV-");
      setNewLabel("Registry");
      setNewColor("green");
      setNewIsChecklist(true);
      setNewChecklistItems(["Verify challenge string 'IDSV-KEEP-98' is in seller bio", "Execute API crawler verify scan", "Perform trademark search with legal archives"]);
    } else if (type === "escrow") {
      setNewTitle("⛓️ Private Escrow re-linking sequence");
      setNewContent("Platform checklist sequencing:");
      setNewLabel("Escrow Checklist");
      setNewColor("amber");
      setNewIsChecklist(true);
      setNewChecklistItems(["Buyer completes secure token bank wire hold", "Seller provides credentials in secure session", "Confirm Original Email (OGE) is changed & 2FA re-bound", "Transfer the custody hold payout directly to seller"]);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("Restore original preloaded transaction templates? This will merge with your active notes list.")) {
      setNotes(prev => [...DEFAULT_NOTES, ...prev.filter(n => !DEFAULT_NOTES.some(d => d.id === n.id))]);
    }
  };

  // Filter notes by query & selected label tag
  const filteredNotes = notes.filter(note => {
    if (note.isArchived) return false;
    
    // Label tag check
    if (selectedLabel !== "All" && note.label !== selectedLabel) return false;

    // Search query check
    const rawSearch = searchQuery.toLowerCase();
    if (!rawSearch) return true;

    return (
      note.title.toLowerCase().includes(rawSearch) ||
      note.content.toLowerCase().includes(rawSearch) ||
      note.label.toLowerCase().includes(rawSearch) ||
      (note.checklist && note.checklist.some(item => item.text.toLowerCase().includes(rawSearch)))
    );
  });

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const otherNotes = filteredNotes.filter(n => !n.isPinned);

  return (
    <div className="min-h-screen bg-[#050505] py-10 px-4 sm:px-6 font-sans text-white select-none relative overflow-hidden" id="idsvault_keep_desk">
      
      {/* Background elegant gradient overlays */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        {/* 1. Header Information Panel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/[0.06]">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-extrabold tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20 inline-block mb-1">
              Broker Workspace Utilities
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none flex items-center gap-2.5">
              <Shield className="h-8 w-8 text-[#D4AF37] stroke-[1.5]" />
              <span>Keep Vault Desk</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8E93] max-w-2xl font-normal leading-relaxed">
              An isolated, premium identity-auditing organizer configured for tracking secure username transactions. Perfect for saving private sourcing leads, verification bio challenge coordinates, and live escrow checklists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={triggerSyncCloudAnimation}
              disabled={isSyncingMock}
              className="px-4 h-10 rounded-xl bg-[#141416]/90 border border-white/[0.08] text-xs font-semibold hover:border-blue-500/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncingMock ? "animate-spin text-blue-400" : "text-[#8E8E93]"}`} />
              <span>{isSyncingMock ? "Syncing..." : "Manual Secure Backup"}</span>
            </button>

            <button 
              onClick={handleRestoreDefaults}
              className="px-4 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold transition-all cursor-pointer"
            >
              Restore Templates
            </button>
          </div>
        </div>

        {/* Info Notification regarding the standard Enterprise scope limits */}
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-left flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-white">OAuth Security Restriction Context Notice</p>
            <p className="text-[11px] text-[#8E8E93] leading-relaxed font-normal">
              IDsVault incorporates OAuth authentication for Google Cloud. Note that Google's standard developer guidelines restrict public production registration of Google Keep scopes exclusively to enterprise-managed Google Workspace domains. To prevent sync downtime, your notes are automatically secured in isolated, persistent sandboxed browser store.
            </p>
          </div>
        </div>

        {/* 2. Interactive Note Creator Component */}
        <div className="max-w-2xl mx-auto">
          
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden relative ${
              isDraggingOver 
                ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                : "border-white/[0.08] bg-[#0F0F10] focus-within:border-[#D4AF37]/40 focus-within:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            }`}
          >
            {/* Visual indicators of Drag Hover */}
            {isDraggingOver && (
              <div className="absolute inset-0 bg-[#050505]/80 flex flex-col items-center justify-center pointer-events-none z-20">
                <Cloud className="h-10 w-10 text-[#D4AF37] animate-bounce mb-2" />
                <p className="text-xs font-bold text-white uppercase tracking-wider">Drop verification image file here</p>
                <p className="text-[10px] text-gray-400">Perfect for license validations, screenshots & escrow contracts</p>
              </div>
            )}

            {/* Drag & Drop Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect} 
              accept="image/*"
            />

            {/* Render Image Attachment Preview */}
            {newImage && (
              <div className="relative group w-full h-44 bg-black overflow-hidden flex items-center justify-center">
                <img src={newImage} alt="Attachment Proof" className="max-h-full object-contain" />
                <button 
                  onClick={() => setNewImage(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/80 hover:bg-black text-gray-300 hover:text-white transition-all cursor-pointer border border-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Note Creator Header */}
            {isExpandingCreator ? (
              <div className="px-5 pt-4 pb-2 border-b border-white/[0.03] flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Note Title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-transparent text-sm font-bold text-white outline-none w-full placeholder-gray-500 font-sans tracking-wide"
                />
                
                <button
                  type="button"
                  onClick={() => setNewIsPinned(!newIsPinned)}
                  className={`p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${newIsPinned ? "text-[#D4AF37]" : "text-[#8E8E93]"}`}
                  title={newIsPinned ? "Unpin note" : "Pin note"}
                >
                  <Pin className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            {/* Note Creator Core Area */}
            <div className="px-5 py-4">
              {newIsChecklist ? (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {newChecklistItems.map((val, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-4 w-4 rounded border border-white/[0.2] flex items-center justify-center" />
                      <input 
                        type="text"
                        placeholder="List item..."
                        value={val}
                        onChange={(e) => handleUpdateCreatorCheckitemValue(idx, e.target.value)}
                        className="bg-transparent text-xs text-white outline-none flex-grow placeholder-gray-600 font-sans font-medium"
                      />
                      <button 
                        onClick={() => handleRemoveCreatorCheckitem(idx)}
                        className="p-1 text-gray-500 hover:text-white transition-all cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                  
                  <button 
                    onClick={handleAddCreatorChecklistItem}
                    className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] hover:text-[#f8df81] transition-all pt-2 ml-6 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Step</span>
                  </button>
                </div>
              ) : (
                <textarea
                  placeholder="Write a secure note or log..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  onFocus={() => setIsExpandingCreator(true)}
                  className="bg-transparent text-xs text-[#8E8E93] outline-none w-full placeholder-gray-500 font-sans leading-relaxed resize-none h-18 font-medium"
                />
              )}
            </div>

            {/* Expanded Toolbar Form Options */}
            {isExpandingCreator ? (
              <div className="px-5 py-3.5 bg-black/40 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4">
                
                <div className="flex items-center gap-2.5">
                  
                  {/* Toggle checklist type */}
                  <button 
                    onClick={() => setNewIsChecklist(!newIsChecklist)}
                    className={`p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${newIsChecklist ? "text-[#D4AF37]" : "text-[#8E8E93]"}`}
                    title={newIsChecklist ? "Switch to Plain Text" : "Add Task Checklist"}
                  >
                    {newIsChecklist ? <Type className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
                  </button>

                  {/* Drag and manual trigger file upload banner */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-[#8E8E93] hover:text-white transition-all cursor-pointer"
                    title="Upload visual screenshot proof"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>

                  {/* Color Selection Palette Dropdown */}
                  <div className="relative group/colors flex items-center">
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-[#8E8E93] hover:text-white transition-all cursor-pointer">
                      <Palette className="h-4 w-4" />
                    </button>
                    
                    <div className="absolute left-0 bottom-8 hidden group-focus-within/colors:flex group-hover/colors:flex bg-[#141416] border border-white/[0.08] p-1.5 rounded-xl gap-1.5 shadow-2xl z-40">
                      {COLORS_LIST.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setNewColor(c.value)}
                          className={`h-4.5 w-4.5 rounded-full border ring-2 ring-transparent hover:scale-110 active:scale-90 transition-all ${
                            c.value === "dark" ? "bg-gray-900 border-white/20" : 
                            c.value === "amber" ? "bg-amber-600 border-amber-400" :
                            c.value === "blue" ? "bg-[#1E40AF] border-blue-400" :
                            c.value === "green" ? "bg-[#065F46] border-emerald-400" :
                            "bg-rose-900 border-rose-400"
                          } ${newColor === c.value ? "ring-white/80" : ""}`}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Label Group Selector */}
                  <div className="relative flex items-center gap-1">
                    <Tag className="h-4 w-4 text-[#8E8E93] shrink-0" />
                    <select
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="bg-transparent text-xs text-[#8E8E93] outline-none border-none py-1 focus:text-white cursor-pointer"
                    >
                      {LABELS_LIST.filter(l => l !== "All").map((l) => (
                        <option key={l} value={l} className="bg-[#141416] text-[#8E8E93]">{l}</option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="flex items-center gap-3 select-none ml-auto">
                  <button 
                    onClick={resetForm}
                    className="px-3.5 py-1.5 text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider cursor-pointer font-mono"
                  >
                    Discard
                  </button>

                  <button 
                    onClick={handleCreateNote}
                    className="px-4 py-1.5 rounded-lg bg-white hover:bg-[#D4AF37] text-black text-xs font-bold font-sans transition-all active:scale-95 shadow-md shadow-white/5 cursor-pointer"
                  >
                    Save to Desk Note
                  </button>
                </div>

              </div>
            ) : (
              <div className="px-5 py-3.5 bg-black/20 border-t border-white/[0.03] flex items-center justify-between">
                
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider leading-none">
                  Quick Load Desk Note Templates:
                </p>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => handleLoadTemplate("sourcing")}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/25 text-blue-400 text-[9px] font-bold font-mono tracking-wider uppercase border border-blue-500/15 cursor-pointer"
                  >
                    + Target Sourcing Tracker
                  </button>

                  <button 
                    onClick={() => handleLoadTemplate("escrow")}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 text-[#D4AF37] text-[9px] font-bold font-mono tracking-wider uppercase border border-amber-500/15 cursor-pointer"
                  >
                    + Escrow Sequence
                  </button>

                  <button 
                    onClick={() => handleLoadTemplate("verification")}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 text-[9px] font-bold font-mono tracking-wider uppercase border border-emerald-500/15 cursor-pointer"
                  >
                    + Bio Verification Challenge
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* 3. Search and Tag Filtering Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1.5">
          
          {/* Label selector tabs */}
          <div className="flex flex-wrap items-center gap-1 p-0.5 bg-[#141416] border border-white/[0.05] rounded-xl self-start">
            {LABELS_LIST.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLabel(l)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                  selectedLabel === l 
                    ? "bg-white text-black shadow-lg" 
                    : "text-[#8E8E93] hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="relative max-w-sm w-full">
            <span className="absolute left-3.5 top-2.5 text-gray-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search secure logs or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141416] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-white outline-none focus:border-white/20 placeholder-gray-500 transition-all font-sans"
            />
          </div>

        </div>

        {/* 4. Notes Grid Output */}
        <div className="space-y-12">
          
          {pinnedNotes.length > 0 && (
            <div className="space-y-4 text-left">
              <h2 className="text-[10px] font-bold text-[#8E8E93] font-mono tracking-widest uppercase">
                PINNED CLOUD SECURED NOTES ({pinnedNotes.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {pinnedNotes.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onTogglePin={handleTogglePin}
                      onArchive={handleArchiveNote}
                      onDelete={handleDeleteNote}
                      onUpdateColor={handleUpdateNoteColor}
                      onUpdateLabel={handleUpdateNoteLabel}
                      onToggleChecklistItem={handleToggleChecklistItem}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Other/Unpinned section */}
          <div className="space-y-4 text-left">
            <h2 className="text-[10px] font-bold text-[#8E8E93] font-mono tracking-widest uppercase">
              {pinnedNotes.length > 0 ? "ADDITIONAL ACTIVE WORKSPACE LOGS" : "ACTIVE WORKSPACE LOGS"} ({otherNotes.length})
            </h2>

            {filteredNotes.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/[0.06] rounded-2xl bg-[#0F0F10] space-y-3">
                <Cloud className="h-10 w-10 text-gray-600 mx-auto" />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono">No active notes cataloged</p>
                <p className="text-[11px] text-gray-500 max-w-sm mx-auto">
                  Create a new note, insert checklist parameters, or click templates to preload digital identity handshakes.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {otherNotes.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onTogglePin={handleTogglePin}
                      onArchive={handleArchiveNote}
                      onDelete={handleDeleteNote}
                      onUpdateColor={handleUpdateNoteColor}
                      onUpdateLabel={handleUpdateNoteLabel}
                      onToggleChecklistItem={handleToggleChecklistItem}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

// Sub-component rendering individual note cards
interface NoteCardProps {
  note: KeepNote;
  onTogglePin: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateColor: (id: string, color: string) => void;
  onUpdateLabel: (id: string, label: string) => void;
  onToggleChecklistItem: (noteId: string, itemId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onTogglePin, 
  onArchive, 
  onDelete, 
  onUpdateColor, 
  onUpdateLabel,
  onToggleChecklistItem
}) => {
  const matchedColor = COLORS_LIST.find(c => c.value === note.color) || COLORS_LIST[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`p-5 rounded-2xl border flex flex-col justify-between h-fit hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] group relative overflow-hidden transition-all duration-300 ${matchedColor.bg} ${matchedColor.border}`}
    >
      
      {/* Content top section */}
      <div className="space-y-4">
        
        {/* Card Header title line */}
        <div className="flex items-start justify-between gap-3">
          <div className="text-left space-y-1">
            <span className="text-[8.5px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-black/60 border border-white/[0.04] px-2 py-0.5 rounded-full inline-block">
              {note.label}
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans pt-0.5">
              {note.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 select-none opacity-40 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onTogglePin(note.id)}
              className={`p-1 hover:bg-white/5 rounded transition-all cursor-pointer ${note.isPinned ? "text-[#D4AF37] opacity-100" : "text-gray-400"}`}
              title={note.isPinned ? "Unpin handle notes" : "Pin handle notes"}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Base64 Upload Image Rendering */}
        {note.image && (
          <div className="w-full h-32 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-white/[0.04] p-1 select-none">
            <img src={note.image} alt="Attachment Proof" className="max-h-full object-contain rounded-lg" />
          </div>
        )}

        {/* Checklist text rendering if checklist is valid */}
        {note.checklist ? (
          <div className="space-y-1.5 pt-1 text-left">
            {note.checklist.map((item) => (
              <div 
                key={item.id}
                onClick={() => onToggleChecklistItem(note.id, item.id)}
                className="flex items-start gap-2.5 cursor-pointer leading-tight py-0.5 group/item select-none"
              >
                <div className={`mt-0.5 h-3.5 w-3.5 rounded border my-auto transition-all flex items-center justify-center shrink-0 ${
                  item.done ? "bg-[#30D158] border-[#30D158]" : "border-white/[0.2] group-hover/item:border-white/40"
                }`}>
                  {item.done && <Check className="h-2 w-2 text-black stroke-[3]" />}
                </div>
                <span className={`text-[11px] font-medium font-sans select-none tracking-wide ${item.done ? "line-through text-[#808080]" : "text-gray-300"}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-300 leading-relaxed font-normal text-left whitespace-pre-wrap">
            {note.content}
          </p>
        )}

      </div>

      {/* Toolbar actions & Status indicators */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-5">
        
        {/* Sync & Timestamp Logs */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-[8px] font-mono text-gray-500 font-semibold">{note.lastUpdated}</span>
          <span className="text-white/10">•</span>
          <div className="flex items-center gap-1">
            <Cloud className={`h-3 w-3 ${note.isGoogleSynced ? "text-[#30D158]" : "text-gray-500 animate-pulse"}`} />
            <span className="text-[8px] font-mono uppercase tracking-wider text-gray-500">
              {note.isGoogleSynced ? "Secured" : "Queued"}
            </span>
          </div>
        </div>

        {/* Edit and state control triggers (revealed on hover) */}
        <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
          
          {/* Background color selection on click */}
          <div className="relative group/palette flex items-center">
            <button className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-all cursor-pointer">
              <Palette className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 bottom-6 hidden group-hover/palette:flex bg-[#141416] border border-white/[0.08] p-1 rounded-lg gap-1 shadow-2xl z-40">
              {COLORS_LIST.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onUpdateColor(note.id, c.value)}
                  className={`h-3.5 w-3.5 rounded-full border border-white/20 hover:scale-110 active:scale-95 transition-all ${
                    c.value === "dark" ? "bg-gray-900" : 
                    c.value === "amber" ? "bg-amber-600" :
                    c.value === "blue" ? "bg-[#1E40AF]" :
                    c.value === "green" ? "bg-[#065F46]" :
                    "bg-rose-900"
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Quick label assignments */}
          <div className="relative group/label flex items-center">
            <button className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-all cursor-pointer">
              <Tag className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 bottom-6 hidden group-hover/label:flex flex-col bg-[#141416] border border-white/[0.08] p-1 rounded-xl shadow-2xl z-40 min-w-[110px] text-left">
              {LABELS_LIST.filter(l => l !== "All").map((l) => (
                <button
                  key={l}
                  onClick={() => onUpdateLabel(note.id, l)}
                  className={`px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider rounded-lg hover:bg-white/5 transition-all block w-full text-left cursor-pointer ${note.label === l ? "text-[#D4AF37]" : "text-gray-400"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onDelete(note.id)}
            className="p-1 hover:bg-rose-500/10 rounded text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
            title="Delete from desk cache"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>

        </div>

      </div>

    </motion.article>
  );
};
