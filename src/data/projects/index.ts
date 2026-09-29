import type { ProjectIdea } from "@/lib/types";
import { PROJECTS_PART1 } from "./part1";
import { PROJECTS_PART2 } from "./part2";

export const ALL_PROJECTS: ProjectIdea[] = [...PROJECTS_PART1, ...PROJECTS_PART2];

export const projectsByCategory = (categoryId: string): ProjectIdea[] =>
  ALL_PROJECTS.filter((p) => p.category === categoryId);

export const TOTAL_PROJECTS = ALL_PROJECTS.length;
