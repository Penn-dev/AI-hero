import raw from '../content/learning/pilot-knowledge.json' with { type: 'json' };
import type { GlossaryEntry } from './article-structure';

export type LearningCard = { title: string; text: string };
export type LearningProfile = {
  kind: 'guide' | 'workshop-lesson' | 'dictionary';
  sourceIds: string[];
  conceptIds: string[];
  prerequisiteIds: string[];
  glossary?: GlossaryEntry[];
  start: { title: string; summary?: string; cards: LearningCard[]; example?: { text: string; explanation: string } };
  bodyTitle?: string;
  check?: { title: string; items: string[]; questions?: { question: string; answer: string }[] };
  originalExamples?: { sourceId: string; text: string }[];
  originalExamplesInline?: boolean;
  related: { title: string; description: string; href: string; format: string }[];
};
type Knowledge = {
  version: number;
  scope: string;
  sources: Record<string, { path: string; sha256: string }>;
  writingRules: string[];
  templates: Record<LearningProfile['kind'], { required: string[]; guidance: string }>;
  concepts: Record<string, { term: string; aliases: string[]; definition: string; dependsOn: string[]; evidence: { sourceId: string; lines: string }[] }>;
  pages: Record<string, LearningProfile>;
};

export const learningKnowledge = raw as Knowledge;
export function learningProfile(route: string): LearningProfile | undefined { return learningKnowledge.pages[route]; }
export function learningGlossary(profile: LearningProfile | undefined, entries: GlossaryEntry[]): GlossaryEntry[] {
  if (!profile) return entries;
  if (profile.glossary) return profile.glossary;
  const approved = profile.conceptIds.map((id) => {
    const concept = learningKnowledge.concepts[id];
    if (!concept) throw new Error(`Unknown learning concept: ${id}`);
    return { id: `term-${id}`, term: concept.term, definition: concept.definition, aliases: concept.aliases };
  });
  const names = new Set(approved.flatMap((entry) => [entry.term, ...entry.aliases]).map((value) => value.toLowerCase()));
  return [...approved, ...entries.filter((entry) => !names.has(entry.term.toLowerCase()))];
}
