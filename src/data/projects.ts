import type { ProjectId } from "../types";
export interface Project {
  id: ProjectId;
  name: string;
  number: string;
  artLabel: string;
  tagline: string;
  copy: string;
  engineeringCopy: string;
  decision: string;
  engineeringDecision: string;
  category: string;
  title: string;
  intro: string;
  challenge: string;
  approach: string;
  accessibleLabel: string;
}
export const projects: Project[] = [
  {
    id: "forma",
    name: "Forma",
    number: "01",
    artLabel: "A common language",
    tagline: "What if consistency created freedom?",
    copy: "A small visual language that feels like one family, without making every screen look like twins. Change a single decision. Watch the rest fall into place.",
    engineeringCopy:
      "Semantic CSS custom properties separate intent from literal colors. Typed React components share the same theme state; a palette change updates the view without replacing its markup.",
    decision:
      "Keep the language consistent. Let the compositions be different.",
    engineeringDecision:
      "Change the token, not every component. Keep the dependency one-way.",
    category: "001 / Design systems",
    title: "Forma. A shared language.",
    intro:
      "What if consistency felt less like a restriction and more like a starting point? Forma explores a small, adaptable visual system built around a few meaningful decisions.",
    challenge:
      "Keep a family of interfaces coherent without making them all identical.",
    approach:
      "Semantic color tokens, modular components, and a deliberate type hierarchy.",
    accessibleLabel: "Explore Forma, a design system concept",
  },
  {
    id: "orbit",
    name: "Orbit",
    number: "02",
    artLabel: "Make space for the work",
    tagline: "What if a tool got out of the way?",
    copy: "A thought comes in. You give it a place. You do the thing. A deliberately small workspace that doesn’t turn getting organized into another job.",
    engineeringCopy:
      "A submit event validates a task and updates typed React state. Native checkboxes drive a derived completed count. Reopening the study keeps its scratchpad; reloading the page clears it.",
    decision: "Remove the dashboard. Keep the next useful action.",
    engineeringDecision:
      "Use browser-native controls and local state before introducing a global store.",
    category: "002 / Product interaction",
    title: "Orbit. Make room for focus.",
    intro:
      "A workspace should help you do the work, not become the work. This study strips a task list down to a simple promise: capture a thought, give it your attention, move on.",
    challenge: "Reduce visual noise without hiding the things that matter.",
    approach:
      "Clear hierarchy, immediate feedback, and a keyboard-friendly capture flow.",
    accessibleLabel: "Explore Orbit, a focus workspace concept",
  },
  {
    id: "syntax",
    name: "Syntax",
    number: "03",
    artLabel: "Make the invisible visible",
    tagline: "What if you could see a thought happen?",
    copy: "A tiny expression playground. You bring a calculation; it shows the steps between your input and its answer. The interesting bit is what happens in between.",
    engineeringCopy:
      "A recursive-descent parser separates expressions, terms, and primary values. Token validation handles unary signs, parentheses, and division by zero. Input is never passed to eval.",
    decision: "Explain the result. Don’t just produce it.",
    engineeringDecision:
      "Respect precedence explicitly: expression → term → primary.",
    category: "003 / Developer experiment",
    title: "Syntax. Follow the thought.",
    intro:
      "A tiny expression playground that makes the invisible visible. Type an arithmetic expression and see it broken into tokens before the result appears. No eval, no hidden magic.",
    challenge:
      "Make a parser understandable without getting in the way of experimentation.",
    approach:
      "Tokenize the input, respect operator precedence, and show useful errors.",
    accessibleLabel: "Explore Syntax, an expression parser concept",
  },
];
export const projectById = Object.fromEntries(
  projects.map((project) => [project.id, project]),
) as Record<ProjectId, Project>;
export const trailLabels: Record<TrailKey, string> = {
  bench: "the experiment",
  forma: "Forma",
  orbit: "Orbit",
  syntax: "Syntax",
};
import type { TrailKey } from "../types";
