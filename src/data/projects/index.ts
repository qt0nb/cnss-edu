import type { ProjectIdea } from "@/lib/types";
import { PROJECTS_PART1 } from "./part1";
import { PROJECTS_PART2 } from "./part2";
import { PROJECTS_PART3 } from "./part3";
import { PROJECTS_PART4 } from "./part4";

export const ALL_PROJECTS: ProjectIdea[] = [
  ...PROJECTS_PART1,
  ...PROJECTS_PART2,
  ...PROJECTS_PART3,
  ...PROJECTS_PART4,
];

export const projectsByCategory = (categoryId: string): ProjectIdea[] =>
  ALL_PROJECTS.filter((p) => p.category === categoryId);

export const TOTAL_PROJECTS = ALL_PROJECTS.length;
