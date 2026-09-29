# Project Worklog — NetMastery | منصة إتقان علوم الشبكات

Comprehensive bilingual (AR/EN) networking-science learning platform.
Stack: Next.js 16 App Router, TS, Tailwind 4, shadcn/ui, Prisma(SQLite), zustand.

Content targets: 100 lessons, 500 tools, 200 monetizable project ideas, quizzes, SRS review, interactive playground.

Architecture decisions:
- Single user-visible route `/` (SPA-style view switching in page.tsx)
- Data lives in `src/data/**` as typed TS files (no DB for content; DB only for progress)
- Views are self-contained components in `src/components/platform/**`
- i18n: `useLang()` context in `src/lib/i18n.tsx`, `Bi = {ar,en}` everywhere, RTL via dir attr
- Progress: zustand persist → localStorage + sync to `/api/progress` (Prisma)
- Theme: emerald primary on zinc neutrals, dark default, next-themes

---
Task ID: 0
Agent: main (Z.ai Code)
Task: Planning + core infrastructure (types, i18n, store, data stubs, module metadata)

Work Log:
- Explored scaffold: fresh Next.js 16, shadcn/ui full set, prisma+sqlite, zustand available, dev server running on :3000
- Define shared types (Lesson, Module, Tool, ProjectIdea, QuizQuestion, ProgressState)
- Create i18n context (AR/EN + RTL), progress store, data index stubs
- Define 10 lesson modules × 10 lessons = 100 lessons plan

Stage Summary:
- Foundation files created; subagent contracts defined (see tasks 1-a..3-c)
