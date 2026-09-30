import type { Tool } from "@/lib/types";
import { TOOLS_PART1 } from "./part1";
import { TOOLS_PART2 } from "./part2";
import { TOOLS_PART3 } from "./part3";
import { TOOLS_PART4 } from "./part4";
import { TOOLS_PART5 } from "./part5";
import { TOOLS_PART6 } from "./part6";
import { TOOLS_PART7 } from "./part7";
import { TOOLS_PART8 } from "./part8";
import { TOOLS_PART9 } from "./part9";
import { TOOLS_PART10 } from "./part10";
import { TOOLS_PART11 } from "./part11";

export const ALL_TOOLS: Tool[] = [
  ...TOOLS_PART1,
  ...TOOLS_PART2,
  ...TOOLS_PART3,
  ...TOOLS_PART4,
  ...TOOLS_PART5,
  ...TOOLS_PART6,
  ...TOOLS_PART7,
  ...TOOLS_PART8,
  ...TOOLS_PART9,
  ...TOOLS_PART10,
  ...TOOLS_PART11,
];

export const toolsByCategory = (categoryId: string): Tool[] =>
  ALL_TOOLS.filter((t) => t.category === categoryId);

export const toolById = (id: string): Tool | undefined => ALL_TOOLS.find((t) => t.id === id);

export const TOTAL_TOOLS = ALL_TOOLS.length;
