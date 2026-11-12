export type LangCode = 'fr' | 'en' | 'tr'

export interface NavContent {
  roster: string
  matches: string
  career: string
  drills: string
  htb: string
  /** Grey subtitle of the "htb" nav entry, which covers Hack The Box and TryHackMe (the section labels stay untouched). */
  htbSub: string
  off: string
  languages: string
  contact: string
}

/** Explicit, recruiter-facing labels shown alongside each themed section title (nav + section headers). */
export interface SectionLabels {
  roster: string
  matches: string
  career: string
  drills: string
  htb: string
  thm: string
  off: string
  languages: string
  contact: string
}

export interface HeroTale {
  k: string
  v: string
}

export interface HeroContent {
  number: string
  /** Caption shown under the big number (the 619 wink). */
  numberNote: string
  /** Caption shown next to the 23 in the top bar. */
  luckyNote: string
  /** Accessible names of the buttons that reveal the two captions. */
  numberLabel: string
  luckyLabel: string
  name1: string
  name2: string
  position: string
  team: string
  bio: string
  kanji: string
  tale: HeroTale[]
  cta1: string
  cta2: string
  cta3: string
}

export interface MatchesContent {
  title: string
  sub: string
  /** Label of the button that reveals the archived (older) projects. */
  more: string
}

export interface Project {
  idx: string
  name: string
  kanji: string
  type: string
  stack: string
  year: string
  opponent: string
  verdict: string
  desc: string
  link: string | null
  /** Optional live demo URL shown next to the GitHub link. */
  demo?: string
  /** Optional architecture diagram (SVG under /public/diagrams) shown as a link next to the code and demo links. */
  schema?: string
  /** In development and not public yet: shows an "in development" badge instead of "confidential". */
  wip?: boolean
  /** Precise status shown instead of "confidential" when there is no public code (e.g. infrastructure taken down). */
  status?: string
  /** Older project, hidden behind the "earlier projects" button until the visitor asks for it. */
  archived?: boolean
  /** Optional case study shown under the description: short titled sections (role, stack, security, takeaway...). */
  caseStudy?: CaseStudySection[]
}

export interface CaseStudySection {
  label: string
  text: string
}

/** Case study section made of a list (HTB notes), numbered when `ordered` (steps of a sequence). */
export interface CaseStudyListSection {
  label: string
  items: string[]
  ordered?: boolean
}

export interface CareerContent {
  title: string
  eduLabel: string
  expLabel: string
}

export interface EduItem {
  year: string
  school: string
  title: string
  desc: string
  current?: boolean
}

export interface ExpItem {
  year: string
  company: string
  title: string
  desc: string
  current?: boolean
}

/**
 * Where a skill was actually used:
 * pro = at work (apprenticeship at Qualitest) · project = a real project (Epitech or personal) ·
 * lab = practised on Hack The Box, TryHackMe or in class.
 */
export type DrillTier = 'pro' | 'project' | 'lab'
export interface DrillItem {
  name: string
  tier: DrillTier
  /** Short proof shown under the name: where the skill was used (company, project, platform). */
  evidence: string
}
/** One level of the legend: themed label, clear label shown under it, and what the level means. */
export interface DrillLevel {
  label: string
  clear: string
  text: string
}
export interface DrillsGroup {
  label: string
  pos: string
  items: DrillItem[]
}

export interface DrillsContent {
  title: string
  sub: string
  legend: Record<DrillTier, DrillLevel>
  groups: DrillsGroup[]
}

export interface HtbContent {
  title: string
  sub: string
  /** Labels of the stat tiles, the season card and the boxes list. */
  labels: {
    points: string
    boxes: string
    bloods: string
    season: string
    seasonFlags: string
    nextLeague: string
    latest: string
    boxesTitle: string
    inProgress: string
    prevPage: string
    nextPage: string
    filterOs: string
    filterLevel: string
    filterAll: string
    filterReset: string
    noResult: string
    colBox: string
    colDifficulty: string
    colOs: string
    colDate: string
    user: string
    noDate: string
    updated: string
    profile: string
    statsLabel: string
    empty: string
    emptyLink: string
  }
  /** HTB notes under the stats: cards opening a modal. */
  notes: HtbNotesContent
  /** Texts of the invite-code riddle gating the notes (console easter egg, speedrun timer, scoreboard). */
  challenge: HtbChallengeContent
}

/** Section of notes on retired HTB machines, shown under the HTB stats. */
export interface HtbNotesContent {
  /** Short label above the section (« Notes HTB »). */
  label: string
  /** Sentence introducing the notes. */
  title: string
  /** Muted line under the title (help from community walkthroughs). */
  credit: string
  /** Call to action of a card. */
  cta: string
  /** Eyebrow of the modal (« 01 / 03 · Note HTB »). */
  eyebrow: string
  closeLabel: string
  /** Titles of the sections of a note. */
  rubrics: { chain: string; flaws: string; pitfalls: string; defense: string; takeaway: string }
  notes: HtbNote[]
  /** Short label above the active-machines grid (« Box actives »). */
  activeLabel: string
  /** Sentence introducing the active machines: no technical detail at all (HTB forbids writeups on live boxes). */
  activeTitle: string
  /** Status shown on every active machine (« En cours »). */
  activeStatus: string
  activeNotes: HtbActiveNote[]
}

/** One retired HTB machine replayed. Box name, OS and difficulty stay in English (as on Hack The Box). */
export interface HtbNote {
  /** Stable key, the same in every language. */
  id: string
  box: string
  os: string
  /** HTB difficulty ('Easy', 'Medium'...); empty while not confirmed: then not shown. */
  difficulty: string
  /** 2 or 3 keywords. */
  keywords: string[]
  /** Steps of the attack chain, in order. */
  chain: string[]
  flaws: string[]
  /** Pitfalls met on my own setup; the section is left out when empty. */
  pitfalls: string[]
  defense: string[]
  takeaway: string
}

/**
 * A currently active HTB machine: name, difficulty and one neutral sentence, nothing else — Hack The Box forbids
 * publishing anything about the solution while a machine is live (no vector, no technique, no keyword). Kept
 * separate from HtbNote so the shape itself rules out a spoiler: a machine only gets a note once it is retired.
 */
export interface HtbActiveNote {
  id: string
  box: string
  difficulty: string
  /** One neutral sentence, with no technical detail whatsoever. */
  summary: string
}

/**
 * Texts of the invite-code riddle gating the HTB notes (console easter egg in the style of the TwoMillion
 * machine's own onboarding API, a speedrun timer and a moderated Hall of Fame). See composables/useHtbChallenge.ts,
 * plugins/htb-console.client.ts and components/HtbTerminalModal.vue.
 */
export interface HtbChallengeContent {
  /** Header shown while locked (« [ACCESS RESTRICTED] »). */
  restrictedTitle: string
  /** Hint to open the browser console and call HTB.help(). */
  hint: string
  /** Shown instead of `hint` on mobile/tablet, where the console is unreachable: points to `fastUnlock` instead. */
  hintMobile: string
  codeLabel: string
  codePlaceholder: string
  submit: string
  invalidCode: string
  /** Fallback for a recruiter in a hurry: unlocks without recording a score. */
  fastUnlock: string
  grantedTitle: string
  elapsedLabel: string
  pseudoLabel: string
  pseudoPlaceholder: string
  saveScore: string
  skipSave: string
  pwnedBadge: string
  resetButton: string
  scoreboardTitle: string
  /** Shown when the scoreboard API exists but does not answer (server mode only, see scoreboardApi in nuxt.config.ts). */
  scoreboardOffline: string
  /** Static site (no scoreboard API): message shown with the final time, instead of the pseudo form and the leaderboard. */
  staticDone: string
  /** Static site: button closing the terminal and opening the note that was clicked. */
  continueToNote: string
  colRank: string
  colPseudo: string
  colTime: string
  colDate: string
  savedLocally: string
  rejectedShape: string
  rejectedProfanity: string
  rejectedSpam: string
  closeLabel: string
}

/** Texts of the TryHackMe stats block (values come from public/data/thm.json). */
export interface ThmContent {
  title: string
  sub: string
  labels: {
    rooms: string
    top: string
    level: string
    badges: string
    points: string
    updated: string
    profile: string
    statsLabel: string
    empty: string
    emptyLink: string
  }
}

export interface OffItem {
  id: string
  kanji: string
  roman: string
  label: string
  color: string
  colorAlt?: string
  role: string
  desc: string
  story: string
}

export interface OffContent {
  title: string
  sub: string
  cta: string
  close: string
  items: OffItem[]
}

export interface LanguageItem {
  code: string
  flag: string
  label: string
  level: string
}

export interface LanguagesContent {
  title: string
  items: LanguageItem[]
}

export interface ContactContent {
  title: string
  lead: string
  /** What I am looking for, where and on which schedule: shown under the lead. */
  availability: string
  email: string
}

/** Localised accessible names for controls that have no visible text. */
export interface A11yContent {
  navPrimary: string
  navMobile: string
  language: string
  theme: string
  menu: string
  legend: string
  backToTop: string
}

export interface LocaleContent {
  nav: NavContent
  sectionLabels: SectionLabels
  a11y: A11yContent
  ticker: string[]
  /** Explicit page title (browser tab, search results, social previews). */
  seoTitle: string
  /** Job title in the JSON-LD Person data of the page. */
  seoJobTitle: string
  /** Text alternative of the Open Graph image of the page (public/og/og-<lang>.png). */
  ogImageAlt: string
  /** Short, dedicated SEO summary (<=160 chars) — used for meta/OG/Twitter description instead of truncating the bio. */
  seoDescription: string
  hero: HeroContent
  matches: MatchesContent
  projects: Project[]
  career: CareerContent
  edu: EduItem[]
  exp: ExpItem[]
  drills: DrillsContent
  htb: HtbContent
  thm: ThmContent
  off: OffContent
  languages: LanguagesContent
  contact: ContactContent
}

export type Portfolio = Record<LangCode, LocaleContent>
