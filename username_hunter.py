#!/usr/bin/env python3
"""
username_hunter.py — Find available Instagram usernames for the idsvault project.

Generates ~500 candidates from multiple buckets, filters them, then checks
Instagram availability via public profile pages (HTTP 404 = available).

Usage:
    python3 username_hunter.py          # live check
    python3 username_hunter.py --dry-run  # generate + filter only, no HTTP
"""

import argparse
import csv
import json
import os
import random
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests

# ──────────────────────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────────────────────

OUTPUT_CSV = "available_usernames.csv"
STATE_FILE = "checked.json"
MAX_FOUND  = 70          # stop when this many available names found
DELAY_MIN  = 2.0         # seconds between requests
DELAY_MAX  = 5.0
RATE_LIMIT_SLEEP = 65    # seconds to sleep on HTTP 429

USER_AGENTS = [
    # Chrome Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    # Chrome macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    # Chrome Linux
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    # Safari macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 "
    "(KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    # Firefox Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) "
    "Gecko/20100101 Firefox/125.0",
    # Mobile Safari
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 "
    "(KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
]

# Basic substring blocklist (offensive / brand-risky terms)
BANNED = [
    "fag", "nig", "kys", "rape", "nazi", "kkk", "cunt", "slut", "whore",
    "porn", "sex", "xxx", "cum", "ass", "dick", "cock", "pussy",
    "shit", "fuck", "crap", "piss", "turd",
]

# Vault / identity seed words
VAULT_SEEDS = [
    "vault", "keep", "safe", "stash", "hoard", "cache", "lock", "key",
    "hold", "store", "drop", "shelf", "nest", "den", "lair", "hub",
    "base", "core", "root", "node", "link", "grid", "zone", "ark",
    "trove", "haul", "case", "cove", "find", "mint",
]

SHORT_SUFFIXES = ["s", "io", "x", "z", "ly", "ed", "al", "en", "on", "er",
                  "os", "ix", "ax", "ox", "ux"]
SHORT_PREFIXES = ["i", "e", "my", "its", "go", "be", "in", "un", "re"]

# CVCV building blocks
CONSONANTS = list("bcdfghjklmnprstvwyz")
VOWELS     = list("aeiou")


# ──────────────────────────────────────────────────────────────
# CANDIDATE GENERATION
# ──────────────────────────────────────────────────────────────

def gen_cvcv() -> list:
    """All 4-letter CVCV combos — perfectly pronounceable."""
    out = []
    for c1 in CONSONANTS:
        for v1 in VOWELS:
            for c2 in CONSONANTS:
                for v2 in VOWELS:
                    out.append(c1 + v1 + c2 + v2)
    return out   # ~1805 entries; we sample later


def gen_vcvc() -> list:
    """Vowel-start VCVC — gives softer handles like 'avik', 'onyx'-feel."""
    out = []
    for v1 in VOWELS:
        for c1 in CONSONANTS:
            for v2 in VOWELS:
                for c2 in CONSONANTS:
                    out.append(v1 + c1 + v2 + c2)
    return out


def gen_cvcvc() -> list:
    """5-letter CVCVC — one step longer but still crisp."""
    out = []
    for c1 in CONSONANTS:
        for v1 in VOWELS:
            for c2 in CONSONANTS:
                for v2 in VOWELS:
                    for c3 in CONSONANTS:
                        out.append(c1 + v1 + c2 + v2 + c3)
    return out   # ~8000 entries; we sample


def gen_vault_themed() -> list:
    """Vault/identity-themed combos: seed alone, seed+suffix, prefix+seed."""
    results = set()
    for seed in VAULT_SEEDS:
        if 3 <= len(seed) <= 6:
            results.add((seed, "vault"))
        for suf in SHORT_SUFFIXES:
            w = seed + suf
            if 3 <= len(w) <= 6:
                results.add((w, "vault"))
        for pre in SHORT_PREFIXES:
            w = pre + seed
            if 3 <= len(w) <= 6:
                results.add((w, "vault"))
    return list(results)


def gen_leet() -> list:
    """L33t-style single-char substitutions — v4ult feels, not bot-y 01 style."""
    leet_map = {"a": "4", "e": "3", "i": "1", "o": "0", "s": "5", "t": "7"}
    extra_seeds = VAULT_SEEDS + [
        "vibes", "fire", "rare", "elite", "apex", "peak",
        "zeal", "rune", "lore", "core", "base", "node",
    ]
    results = set()
    for seed in extra_seeds:
        for i, ch in enumerate(seed):
            if ch in leet_map:
                w = seed[:i] + leet_map[ch] + seed[i + 1:]
                if 3 <= len(w) <= 6:
                    results.add((w, "leet"))
    return list(results)


# Curated embedded wordlist (no /usr/share/dict/words assumed)
DICT_WORDS = [
    # 4-letter — punchy monosyllables and fun rhymes
    "apex", "aria", "aura", "axle", "bane", "bask", "beam", "bind", "bolt",
    "bond", "brim", "buff", "burn", "byte", "cage", "calm", "cape", "carve",
    "cave", "cell", "clan", "claw", "clay", "coil", "colt", "cord", "cove",
    "crag", "crew", "cube", "curl", "cyan", "dare", "dark", "dart", "dash",
    "dawn", "daze", "deft", "dive", "dock", "dome", "dune", "dusk", "edge",
    "epic", "etch", "fade", "fare", "fast", "fate", "fawn", "feat", "fern",
    "file", "fire", "firm", "fist", "flex", "flip", "flow", "foam", "foil",
    "fold", "folk", "font", "ford", "fore", "fork", "form", "fort", "fray",
    "free", "fuse", "gale", "gaze", "gear", "glee", "glow", "glue", "grit",
    "grip", "gulf", "gust", "hale", "halo", "halt", "haze", "heft", "helm",
    "hide", "hilt", "hint", "hive", "hole", "hone", "hook", "hope", "horn",
    "hull", "hunt", "hush", "icon", "idle", "iris", "iron", "isle", "jade",
    "jest", "jive", "join", "keen", "kind", "king", "knit", "lace", "lark",
    "lash", "laud", "lava", "lawn", "lead", "lean", "leap", "lend", "lens",
    "lime", "line", "loft", "lore", "lure", "lush", "lynx", "mace", "mage",
    "mane", "mare", "mark", "mast", "maze", "meld", "mend", "mesh", "meta",
    "mild", "mime", "mind", "mine", "mint", "mist", "mode", "muse", "neon",
    "nest", "node", "noir", "nova", "null", "oath", "once", "opus", "orca",
    "pale", "pare", "park", "pave", "peak", "perk", "pier", "pike", "pile",
    "pine", "pipe", "pith", "ploy", "plug", "pole", "pond", "pore", "port",
    "prow", "pure", "push", "race", "raid", "rail", "rake", "rand", "rank",
    "rare", "rave", "reef", "rein", "rend", "ride", "rift", "ring", "riot",
    "ripe", "rise", "risk", "rite", "roam", "robe", "role", "roll", "rook",
    "rope", "rose", "rove", "rune", "rush", "rust", "sage", "sail", "salt",
    "scan", "seal", "seam", "shed", "shin", "ship", "silk", "silt", "sine",
    "sire", "site", "skew", "skip", "slim", "slip", "slug", "snap", "snip",
    "soar", "soft", "sole", "soul", "spar", "spin", "spit", "spot", "star",
    "stem", "step", "stir", "stub", "suit", "surf", "sway", "swim",
    "tale", "tame", "tang", "tape", "teal", "tear", "tell", "tend", "term",
    "text", "tier", "tile", "tint", "tire", "toll", "tone", "toss", "tour",
    "tram", "trap", "tray", "trek", "trim", "trio", "true", "tuft", "tune",
    "turn", "type", "undo", "unit", "urge", "vale", "vane", "vast", "veil",
    "vent", "vine", "vise", "void", "volt", "wade", "waft", "wake", "wane",
    "ward", "ware", "warm", "warp", "wave", "weld", "whim", "whip", "wide",
    "wild", "wisp", "woke", "wrap", "writ", "yore", "zeal", "zest", "zinc",
    "zone", "zoom",
    # 5-letter — slightly longer, still brand-friendly
    "abyss", "adorn", "agile", "aglow", "alert", "align", "alloy", "aloft",
    "amaze", "amber", "ambit", "amend", "ample", "apart", "array", "aside",
    "asset", "atone", "audit", "augur", "azure", "basil", "being", "belle",
    "bijou", "black", "blade", "blaze", "blend", "bliss", "bloom", "blown",
    "blunt", "brace", "braid", "brave", "brawn", "blaze", "brink", "brisk",
    "broad", "brood", "brush", "burst", "buyer", "cabal", "cabin", "cadet",
    "cairn", "calyx", "candid","canto", "carom", "carve", "cedar", "chain",
    "chalk", "chard", "charm", "chart", "chase", "cheap", "check", "chess",
    "chisel","choir", "chord", "cinch", "civic", "civil", "clang", "clank",
    "clash", "clasp", "clean", "clear", "clerk", "click", "cliff", "climb",
    "cling", "cloak", "clone", "close", "cloud", "clump", "comet", "coral",
    "covet", "craft", "crane", "creak", "crest", "crisp", "cross", "crown",
    "crush", "crypt", "curve", "decal", "depot", "depth", "derby", "deter",
    "digit", "dirge", "disco", "divot", "draft", "drain", "drake", "drape",
    "drawl", "drawn", "dread", "dream", "drift", "drill", "drip",  "drive",
    "droop", "drove", "dryad", "duvet", "dwarf", "dwell", "eager", "early",
    "easel", "edify", "eject", "elbow", "elder", "elegy", "elude", "embolden",
    "ember", "emote", "endow", "engulf","envoy", "epoch", "evoke", "exalt",
    "exist", "expel", "extra", "fable", "facet", "faith", "famed", "fancy",
    "farce", "feast", "feint", "fetch", "fever", "fiber", "finch", "fixed",
    "fjord", "flake", "flame", "flank", "flare", "flash", "fleet", "flesh",
    "flock", "flood", "floor", "flora", "floss", "flout", "focus", "forte",
    "frame", "frank", "freed", "fresh", "frond", "front", "frost", "froth",
    "froze", "fungi", "furze", "gavel", "gemma", "genre", "ghost", "glade",
    "glare", "glass", "gleam", "glide", "glint", "gloom", "gloss", "glove",
    "grace", "grade", "graft", "grain", "grand", "grant", "grasp", "graze",
    "greet", "grind", "groan", "groom", "grope", "gross", "group", "grove",
    "growl", "gruel", "guard", "guile", "guise", "gusto", "hatch", "haunt",
    "haven", "hazel", "heist", "helix", "heron", "hitch", "hoard", "hobby",
    "house", "hover", "howl", "human", "humor", "hurdle","hydra", "hyena",
    "icier", "ideal", "idiom", "igloo", "image", "infer", "ingot", "inlet",
    "inter", "intra", "irate", "ivory", "jaunt", "jewel", "joust", "knack",
    "kneel", "knife", "knock", "knoll", "known", "label", "lance", "large",
    "laser", "latch", "latte", "layer", "learn", "leech", "lemma", "level",
    "light", "lilac", "limit", "lingo", "liver", "lodge", "logic", "loose",
    "lotus", "lucid", "lunar", "lusty", "magic", "maple", "march", "marsh",
    "match", "media", "merge", "merit", "midst", "might", "mimic", "minor",
    "mirth", "model", "mogul", "mooch", "moral", "mural", "music", "myrrh",
    "naive", "nerve", "night", "nimble","noble", "north", "notch", "novel",
    "nymph", "occur", "octal", "onset", "onyx",  "opera", "orbit", "order",
    "outer", "outrun","overt", "oxide", "ozone", "paint", "panda", "panel",
    "papal", "parse", "patch", "pause", "pedal", "perch", "petal", "phase",
    "pilot", "pinch", "pixel", "pivot", "pixel", "plain", "plane", "plank",
    "plant", "plate", "plaza", "pleat", "pluck", "plumb", "plume", "plunk",
    "point", "poise", "polar", "pouch", "power", "press", "price", "pride",
    "prime", "print", "prior", "prism", "probe", "prone", "proof", "prose",
    "prune", "pulse", "punch", "pupil", "purge", "quest", "queue", "quick",
    "quiet", "quota", "quote", "radix", "rally", "ramen", "ranch", "range",
    "rapid", "reach", "realm", "rebel", "refer", "reign", "relax", "repel",
    "repot", "rerun", "resin", "reuse", "revel", "rider", "rivet", "riyal",
    "roast", "robin", "rogue", "rouge", "round", "route", "rugby", "ruler",
    "safari","salvo", "sandy", "savor", "scale", "scalp", "scald", "scam",
    "scamp", "scene", "scope", "score", "scout", "seize", "sense", "serum",
    "serve", "setup", "seven", "shaft", "shake", "shall", "shame", "shape",
    "share", "sharp", "sheen", "shelf", "shift", "shore", "short", "shrub",
    "sight", "sigma", "silky", "simmer","since", "sinew", "sixth", "skill",
    "slate", "sleek", "slice", "slide", "slope", "slosh", "sloth", "smart",
    "smear", "smelt", "smite", "smoke", "snare", "sneak", "solar", "solid",
    "solve", "spawn", "spear", "speed", "spell", "spend", "spire", "spite",
    "split", "spore", "sport", "spout", "sprig", "spunk", "squad", "squid",
    "stack", "stage", "stain", "stale", "stall", "stamp", "stand", "stark",
    "start", "stash", "state", "stayd", "steal", "steel", "steep", "steer",
    "stern", "stick", "still", "sting", "stock", "stoic", "stomp", "stone",
    "stool", "storm", "story", "stout", "strap", "straw", "stray", "strip",
    "strom", "strut", "study", "stump", "stung", "stunt", "style", "suave",
    "super", "surge", "sweep", "sweet", "swift", "swipe", "swirl", "sworn",
    "synth", "table", "taboo", "taken", "taper", "taunt", "tense", "tenor",
    "terra", "thick", "thine", "thorn", "those", "throb", "throw", "thrum",
    "thud", "thumb", "tiger", "tight", "tilde", "timer", "title", "toast",
    "token", "tonic", "total", "totem", "touch", "tough", "toxic", "trace",
    "track", "trade", "trail", "train", "trait", "tramp", "tread", "treat",
    "trial", "trick", "tried", "trope", "trout", "truce", "truck", "trunk",
    "truss", "trust", "truth", "tuber", "tundra","tuner", "tweak", "twill",
    "twirl", "twist", "tying", "ultra", "umbra", "unify", "union", "until",
    "unzip", "upper", "usher", "utile", "vague", "valid", "valor", "valve",
    "vapor", "vaunt", "venal", "verse", "vigor", "viper", "viral", "virge",
    "visor", "vista", "vital", "vivid", "vixen", "vocal", "voila", "voter",
    "wager", "waltz", "watch", "weave", "wedge", "weigh", "weild", "weird",
    "whale", "wheat", "wheel", "where", "while", "whole", "whose", "wider",
    "width", "witch", "woman", "world", "worth", "would", "wrath", "write",
    "xenon", "yacht", "yearn", "yield", "young", "yours", "youth", "zappy",
    "zebra",
    # 6-letter — slightly longer, still crisp
    "alpine", "anchor", "anvil", "ardent", "astral", "aurora", "beacon",
    "bonded", "border", "bright", "candor", "carbon", "castle", "cipher",
    "citrus", "cobalt", "codify", "cohere", "collab", "column", "covert",
    "crater", "daemon", "define", "deluge", "domain", "dynamo", "embark",
    "emblem", "encode", "enfold", "ensign", "entomb", "enwrap", "errant",
    "evolve", "exhale", "expand", "expose", "factor", "fallow", "fathom",
    "fervor", "fester", "fissure","flaunt", "flight", "flurry", "flying",
    "forage", "forged", "frozen", "fusion", "garnet", "girder", "glacial",
    "glitch", "goblet", "gravel", "grotto", "gyrate", "harbor", "hearth",
    "helium", "herald", "hermit", "hidden", "hiking", "hoards", "hollow",
    "humble", "hunter", "hybrid", "hyphen", "ignite", "illume", "immune",
    "impact", "impart", "impose", "indigo", "infamy", "infuse", "inland",
    "insist", "invoke", "iodine", "jarvis", "jigsaw", "jostle", "jungle",
    "keeper", "kernel", "kindle", "knives", "labyrinth", "lancer", "latent",
    "launch", "lavish", "locket", "lodged", "mantle", "marble", "matrix",
    "menace", "midday", "mirror", "mortal", "mosaic", "motion", "motive",
    "mutant", "mystic", "nebula", "nettle", "nimbus", "normal", "nurtured",
    "offset", "onward", "oracle", "outlaw", "output", "oyster", "pardon",
    "patrol", "pendix", "photon", "pillar", "pinned", "plinth", "plunge",
    "powder", "proven", "prowl", "radiant","rampart","ransom","raptor",
    "reflex", "refuge", "regnant","relent", "remote", "render", "renown",
    "repute", "reveal", "rewind", "ritual", "robust", "rotten", "rubric",
    "rumble", "runoff", "sacred", "saddle", "sample", "sarong", "schism",
    "scroll", "sentry", "serene", "signal", "silent", "sinker", "skyward",
    "sleuth", "sliver", "snappy", "sorrow", "source", "spiked", "spiral",
    "spoken", "steady", "steely", "strobe", "strong", "summit", "sunlit",
    "sunken", "symbol", "syntax", "tackle", "talent", "tangle", "target",
    "tailor", "tartan", "tawny", "taxter", "tectum", "temper", "temple",
    "tender", "tether", "theory", "thrall", "thread", "threat", "thrice",
    "throne", "thrust", "timbre", "toggle", "torque", "torrent","traced",
    "trader", "trance", "trench", "triage", "tribal", "trophy", "turret",
    "tycoon", "ultima", "umbral", "unfold", "unique", "unseen", "uphold",
    "uproot", "uptake", "utmost", "vector", "velvet", "vendor", "versus",
    "vertex", "vessel", "vested", "vibrant","virgin", "vision", "warmth",
    "warden", "wildly", "winged", "wisdom", "wizard", "wonder", "warden",
    "zenith", "zipper",
]

# Deduplicate embedded list in place
DICT_WORDS = list(dict.fromkeys(DICT_WORDS))


def load_dict_words() -> list:
    """Return word list from /usr/share/dict/words or embedded fallback."""
    path = Path("/usr/share/dict/words")
    if path.exists():
        words = []
        with open(path) as f:
            for line in f:
                w = line.strip().lower()
                if 4 <= len(w) <= 6 and re.match(r"^[a-z]+$", w):
                    words.append(w)
        return words
    return DICT_WORDS


# ──────────────────────────────────────────────────────────────
# BUILD FULL CANDIDATE POOL
# ──────────────────────────────────────────────────────────────

def build_candidates() -> list:
    """Return list of (username, type) tuples, ~500 total."""
    pool = []

    # Bucket 1 — CVCV 4-letter (sample 160)
    cvcv = gen_cvcv()
    random.shuffle(cvcv)
    pool += [(w, "cvcv") for w in cvcv[:160]]

    # Bucket 2 — VCVC 4-letter (sample 60)
    vcvc = gen_vcvc()
    random.shuffle(vcvc)
    pool += [(w, "vcvc") for w in vcvc[:60]]

    # Bucket 3 — CVCVC 5-letter (sample 80)
    cvcvc = gen_cvcvc()
    random.shuffle(cvcvc)
    pool += [(w, "cvcvc") for w in cvcvc[:80]]

    # Bucket 4 — dictionary words
    dict_words = load_dict_words()
    random.shuffle(dict_words)
    pool += [(w, "dict") for w in dict_words[:120]]

    # Bucket 5 — vault-themed
    pool += gen_vault_themed()

    # Bucket 6 — l33t combos
    pool += gen_leet()

    # Deduplicate, preserving first-seen type
    seen: set = set()
    unique = []
    for w, t in pool:
        if w not in seen:
            seen.add(w)
            unique.append((w, t))

    return unique


# ──────────────────────────────────────────────────────────────
# FILTERING
# ──────────────────────────────────────────────────────────────

VOWEL_SET = set("aeiou")


def is_pronounceable(w: str) -> bool:
    """
    Heuristic: reject if 3+ consecutive consonants appear,
    or if the word has zero vowels (treating digits as neutral).
    """
    streak = 0
    has_vowel = False
    for ch in w:
        if not ch.isalpha():
            streak = 0          # digits break consonant runs
            continue
        if ch in VOWEL_SET:
            has_vowel = True
            streak = 0
        else:
            streak += 1
            if streak >= 3:
                return False
    return has_vowel


def is_valid(w: str) -> bool:
    """Apply all filter rules from spec."""
    # Length 3-6
    if not (3 <= len(w) <= 6):
        return False
    # Only lowercase letters + digits (no underscores/dots)
    if not re.match(r"^[a-z][a-z0-9]*$", w):
        return False
    # Pronounceability
    if not is_pronounceable(w):
        return False
    # Banned substrings
    for bad in BANNED:
        if bad in w:
            return False
    return True


def filter_candidates(pool: list) -> list:
    return [(w, t) for w, t in pool if is_valid(w)]


# ──────────────────────────────────────────────────────────────
# INSTAGRAM AVAILABILITY CHECK
# ──────────────────────────────────────────────────────────────

def load_ig_cookies() -> dict:
    """
    Load Instagram session cookies from (in priority order):
      1. IG_SESSION_ID + IG_CSRF_TOKEN environment variables
      2. .env file in the current directory
      3. ig_cookies.json  {"sessionid": "...", "csrftoken": "..."}

    HOW TO GET YOUR COOKIES
    -----------------------
    1. Log in to Instagram in Chrome/Firefox.
    2. Open DevTools (F12) → Application tab → Cookies → https://www.instagram.com
    3. Copy the values for  sessionid  and  csrftoken.
    4. Either:
         export IG_SESSION_ID=<value>
         export IG_CSRF_TOKEN=<value>
       or create ig_cookies.json:
         {"sessionid": "<value>", "csrftoken": "<value>"}

    Without valid cookies Instagram returns 401 for all API requests
    after a small number of unauthenticated hits.
    """
    # 1. Environment variables
    sid  = os.environ.get("IG_SESSION_ID", "")
    csrf = os.environ.get("IG_CSRF_TOKEN", "")
    if sid:
        return {"sessionid": sid, "csrftoken": csrf}

    # 2. .env file (simple KEY=VALUE, no quotes needed)
    env_path = Path(".env")
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line.startswith("IG_SESSION_ID="):
                sid = line.split("=", 1)[1].strip().strip('"\'')
            if line.startswith("IG_CSRF_TOKEN="):
                csrf = line.split("=", 1)[1].strip().strip('"\'')
        if sid:
            return {"sessionid": sid, "csrftoken": csrf}

    # 3. ig_cookies.json
    cookie_path = Path("ig_cookies.json")
    if cookie_path.exists():
        data = json.loads(cookie_path.read_text())
        if data.get("sessionid"):
            return data

    return {}


def make_session(cookies: dict) -> requests.Session:
    s = requests.Session()
    s.headers.update({
        "User-Agent":      random.choice(USER_AGENTS),
        "Accept":          "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection":      "keep-alive",
        "X-IG-App-ID":     "936619743392459",
        "X-Requested-With": "XMLHttpRequest",
    })
    if cookies:
        s.cookies.update(cookies)
        s.headers.update({"X-CSRFToken": cookies.get("csrftoken", "")})
    return s


def check_username(session: requests.Session, username: str) -> str:
    """
    Returns: 'available' | 'taken' | 'skip'

    Instagram's internal profile-info endpoint:
      GET /api/v1/users/web_profile_info/?username={name}

    With a valid session cookie this reliably returns:
      HTTP 404 → username does not exist (available)
      HTTP 200 → profile exists (taken)

    Without cookies the endpoint returns 401 after a small number of
    requests due to IP-based rate limiting.

    HTTP 429  → rate-limited: sleep then retry
    HTTP 401/403 → auth required; remind user to supply cookies
    Other     → skip
    """
    url = f"https://www.instagram.com/api/v1/users/web_profile_info/?username={username}"
    session.headers.update({"User-Agent": random.choice(USER_AGENTS)})

    for attempt in range(3):
        try:
            resp = session.get(url, timeout=20, allow_redirects=True)

            if resp.status_code == 404:
                return "available"

            if resp.status_code == 200:
                return "taken"

            if resp.status_code == 429:
                wait = RATE_LIMIT_SLEEP + random.randint(0, 15)
                print(f"\n  ⚠️  Rate-limited (429). Sleeping {wait}s …", flush=True)
                time.sleep(wait)
                continue   # retry same username

            if resp.status_code in (401, 403):
                print(
                    f"\n  🔒  Instagram returned {resp.status_code} — session cookie required.\n"
                    f"      Add your cookies via IG_SESSION_ID / IG_CSRF_TOKEN env vars\n"
                    f"      or create ig_cookies.json. See --help for details.\n"
                    f"      Halting to avoid wasting the candidate queue.",
                    flush=True,
                )
                sys.exit(1)

            # Unexpected status
            print(f"  ⚠️  HTTP {resp.status_code} for {username}", flush=True)
            return "skip"

        except requests.exceptions.ConnectionError:
            backoff = 2 ** (attempt + 1)
            print(f"  ⚠️  Connection error. Retry in {backoff}s …", flush=True)
            time.sleep(backoff)
        except requests.exceptions.Timeout:
            print(f"  ⚠️  Timeout on {username}. Skipping.", flush=True)
            return "skip"
        except requests.exceptions.RequestException as exc:
            print(f"  ⚠️  Request error: {exc}", flush=True)
            return "skip"

    return "skip"   # exhausted retries


# ──────────────────────────────────────────────────────────────
# STATE + CSV HELPERS
# ──────────────────────────────────────────────────────────────

def load_state() -> dict:
    if Path(STATE_FILE).exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"checked": {}}


def save_state(state: dict):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def init_csv():
    if not Path(OUTPUT_CSV).exists():
        with open(OUTPUT_CSV, "w", newline="") as f:
            csv.writer(f).writerow(["username", "length", "type", "checked_at"])


def append_csv(username: str, length: int, utype: str, checked_at: str):
    with open(OUTPUT_CSV, "a", newline="") as f:
        csv.writer(f).writerow([username, length, utype, checked_at])


# ──────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="idsvault — Instagram username hunter"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Generate and filter candidates without hitting Instagram",
    )
    parser.add_argument(
        "--max",
        type=int,
        default=MAX_FOUND,
        metavar="N",
        help=f"Stop after N available names found (default {MAX_FOUND})",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=None,
        help="Random seed for reproducible candidate generation",
    )
    args = parser.parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    target = args.max

    print()
    print("🔐  idsvault — Instagram Username Hunter")
    print("=" * 54)

    # ── Load cookies ──
    cookies = load_ig_cookies()
    if cookies:
        print(f"  Auth      : session cookie loaded ✅")
    else:
        print(f"  Auth      : ⚠️  no cookies found — Instagram will 401 after ~5 requests")
        print(f"              Set IG_SESSION_ID + IG_CSRF_TOKEN or create ig_cookies.json")
    print()

    # ── Generate + filter ──
    raw = build_candidates()
    print(f"  Generated : {len(raw):>5} raw candidates")

    pool = filter_candidates(raw)
    random.shuffle(pool)
    print(f"  Filtered  : {len(pool):>5} valid candidates to check")
    print(f"  Target    : {target} available names")
    print()

    # ── Dry-run ──
    if args.dry_run:
        print("[DRY RUN] First 30 candidates (no HTTP requests):")
        print(f"  {'#':>3}  {'username':<10}  {'len':>3}  type")
        print(f"  {'-'*3}  {'-'*10}  {'-'*3}  {'-'*8}")
        for i, (w, t) in enumerate(pool[:30], 1):
            print(f"  {i:>3}  {w:<10}  {len(w):>3}  {t}")
        print(f"\n  Full pool would check {len(pool)} candidates.")
        print("  Re-run without --dry-run to start live checking.")
        return

    # ── Live run ──
    state = load_state()
    checked: dict = state.get("checked", {})
    found = [u for u, r in checked.items() if r == "available"]
    skipped_count = len([r for r in checked.values() if r == "skip"])

    init_csv()
    session = make_session(cookies)

    print(f"  Resuming  : {len(checked)} already checked, "
          f"{len(found)} available found, {skipped_count} skipped")
    print("─" * 54)

    total_this_session = 0

    for username, utype in pool:
        if len(found) >= target:
            print(f"\n🎉  Reached {target} available usernames. Done!")
            break

        if username in checked:
            continue

        # Live progress line
        print(f"[CHECKING] {username:<10}", end="  ", flush=True)

        result = check_username(session, username)
        ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

        checked[username] = result
        total_this_session += 1

        if result == "available":
            found.append(username)
            badge = f"✅  AVAILABLE  ({len(found)}/{target})"
            append_csv(username, len(username), utype, ts)
        elif result == "taken":
            badge = "❌  TAKEN"
        else:
            badge = "⏭️   SKIP"

        print(badge, flush=True)

        # Periodic state save (every 10 checks)
        if total_this_session % 10 == 0:
            state["checked"] = checked
            save_state(state)

        # Polite random delay
        time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))

    else:
        print("\nℹ️  All candidates exhausted.")

    # Final state save
    state["checked"] = checked
    save_state(state)

    # Summary
    print()
    print("=" * 54)
    print(f"  ✅  Session complete.")
    print(f"  Checked this session : {total_this_session}")
    print(f"  Available found      : {len(found)}")
    print(f"  Results CSV          : {OUTPUT_CSV}")
    print(f"  State file           : {STATE_FILE}")
    if found:
        display = found[:15]
        more = len(found) - len(display)
        print(f"\n  Top finds: {', '.join(display)}", end="")
        if more > 0:
            print(f" … (+{more} more)")
        else:
            print()
    print()


if __name__ == "__main__":
    main()
