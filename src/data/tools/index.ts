import type { Tool } from "@/lib/types";
import { TOOLS_PART1 } from "./part1";
import { TOOLS_PART2 } from "./part2";
import { TOOLS_PART3 } from "./part3";
import { TOOLS_PART4 } from "./part4";
import { TOOLS_PART5 } from "./part5";

export const ALL_TOOLS: Tool[] = [
  ...TOOLS_PART1,
  ...TOOLS_PART2,
  ...TOOLS_PART3,
  ...TOOLS_PART4,
  ...TOOLS_PART5,
];

export const toolsByCategory = (categoryId: string): Tool[] =>
  ALL_TOOLS.filter((t) => t.category === categoryId);

export const toolById = (id: string): Tool | undefined => ALL_TOOLS.find((t) => t.id === id);

export const TOTAL_TOOLS = ALL_TOOLS.length;
