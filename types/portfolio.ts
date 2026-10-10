export type LangCode = 'fr' | 'en' | 'tr'

export interface NavContent {
  roster: string
  matches: string
  career: string
  drills: string
  htb: string
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
  /** In development and not public yet: shows an "in development" badge instead of "confidential". */
  wip?: boolean
  /** Older project, hidden behind the "earlier projects" button until the visitor asks for it. */
  archived?: boolean
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

/** starter = used on a delivered project or at work · bench = practised in class, lab or long ago */
export type DrillTier = 'starter' | 'bench'
export interface DrillItem {
  name: string
  tier: DrillTier
}
export interface DrillsGroup {
  label: string
  pos: string
  items: DrillItem[]
  /**
   * Optional proof links shown under the list (e.g. TryHackMe, Hack The Box profiles).
   * A label may contain {rooms} and {top}, filled from public/data/thm.json; without that file the
   * figures are dropped (everything from the first " · " on).
   */
  proofs?: { label: string; url: string }[]
}

export interface DrillsContent {
  title: string
  sub: string
  legend: { starter: string; bench: string }
  groups: DrillsGroup[]
}

export interface HtbContent {
  title: string
  sub: string
  /** Labels of the stat tiles, the season card and the boxes list. */
  labels: {
    rank: string
    points: string
    ranking: string
    boxes: string
    bloods: string
    nextRank: string
    season: string
    seasonRank: string
    seasonPoints: string
    seasonFlags: string
    nextLeague: string
    latest: string
    systemsSub: string
    boxesTitle: string
    colBox: string
    colDifficulty: string
    colOs: string
    colFlag: string
    colDate: string
    root: string
    user: string
    noDate: string
    updated: string
    profile: string
    statsLabel: string
    empty: string
    emptyLink: string
  }
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
}

export interface LocaleContent {
  nav: NavContent
  sectionLabels: SectionLabels
  a11y: A11yContent
  ticker: string[]
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
