export type LangCode = 'fr' | 'en' | 'tr'

export interface NavContent {
  roster: string
  matches: string
  career: string
  drills: string
  off: string
  languages: string
  contact: string
  music: string
}

export interface HeroStat {
  label: string
  value: string
  sub: string
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
  stats: HeroStat[]
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

export interface DrillsGroup {
  label: string
  pos: string
  items: string[]
}

export interface DrillsContent {
  title: string
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

export interface LocaleContent {
  nav: NavContent
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
