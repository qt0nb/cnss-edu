import type { Lesson, ModuleMeta } from "@/lib/types";
import { MODULES } from "@/data/modules";
import { m01_LESSONS } from "./m01";
import { m02_LESSONS } from "./m02";
import { m03_LESSONS } from "./m03";
import { m04_LESSONS } from "./m04";
import { m05_LESSONS } from "./m05";
import { m06_LESSONS } from "./m06";
import { m07_LESSONS } from "./m07";
import { m08_LESSONS } from "./m08";
import { m09_LESSONS } from "./m09";
import { m10_LESSONS } from "./m10";

export const ALL_LESSONS: Lesson[] = [
  ...m01_LESSONS,
  ...m02_LESSONS,
  ...m03_LESSONS,
  ...m04_LESSONS,
  ...m05_LESSONS,
  ...m06_LESSONS,
  ...m07_LESSONS,
  ...m08_LESSONS,
  ...m09_LESSONS,
  ...m10_LESSONS,
];

export const lessonsByModule = (moduleId: string): Lesson[] =>
  ALL_LESSONS.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);

export const lessonById = (id: string): Lesson | undefined =>
  ALL_LESSONS.find((l) => l.id === id);

export const modulesWithLessons = (): { module: ModuleMeta; lessons: Lesson[] }[] =>
  MODULES.map((module) => ({
    module,
    lessons: lessonsByModule(module.id),
  }));

export const TOTAL_LESSONS = ALL_LESSONS.length;
