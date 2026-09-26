export type LangCode = 'fr' | 'en' | 'tr'

export interface NavContent {
  roster: string
  matches: string
  career: string
  drills: string
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
  /** Optional proof links shown under the list (e.g. TryHackMe, Hack The Box profiles). */
  proofs?: { label: string; url: string }[]
}

export interface DrillsContent {
  title: string
  sub: string
  legend: { starter: string; bench: string }
  groups: DrillsGroup[]
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
  off: OffContent
  languages: LanguagesContent
  contact: ContactContent
}

export type Portfolio = Record<LangCode, LocaleContent>
